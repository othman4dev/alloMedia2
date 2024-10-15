const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!email || !password || !confirmPassword || !name) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Validate email, phone number, and password strength
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const user = await User.create({
      name,
      email,
      password: password,
      role: "client",
    });

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // Send verification email
    const verificationUrl = `${req.protocol}://localhost:5000/api/auth/verify-email/${verificationToken}`;
    const message = `Click the link to verify your email: ${verificationUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Email Verification for alloMedia",
      message,
    });

    if (process.env.NODE_ENV === "test") {
      return res.status(200).json({
        token: verificationToken,
      });
    }
    res.status(200).json({
      message:
        "User registered successfully! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login a user and send OTP
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (user && !user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email to log in." });
    }

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(400)
        .json({ message: "Invalid email or password test" });
    }

    // If there's a valid token, skip OTP step
    if (req.cookies && req.cookies.token) {
      try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        if (decoded.id === user._id.toString()) {
          // save the user to the session
          req.session.user = user;
          return res
            .status(200)
            .json({ message: "Login successfull", user: user });
        }
      } catch (err) {
        // Token invalid or expired, proceed with OTP
        console.log("Token invalid or expired");
      }
    }

    // OTP logic
    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    const message = `Your OTP is ${otp}. It will expire in 10 minutes.`;
    await sendEmail({
      email: user.email,
      subject: "Your OTP for alloMedia",
      message,
    });

    if (process.env.NODE_ENV === "test") {
      return res.status(200).json({
        message: "OTP sent to your email",
        userId: user._id,
        token: otp,
      });
    }
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP and generate JWT
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Please provide OTP" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP and generate JWT
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    req.session.user = user;
    return res.status(200).json({
      message: "OTP verified successfully, login successfull",
      user: user,
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      let encodedMessage = encodeURIComponent("Invalid or expired token");
      return res.redirect(
        `http://localhost:3000/login?popup=${encodedMessage}&color=red`
      );
    }

    // Activate the user account
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    user.isVerified = true;
    await user.save();

    const encodedMessage = encodeURIComponent(
      "Email verified, you can now login"
    );
    return res.redirect(
      `http://localhost:3000/login?popup=${encodedMessage}&color=green`
    );
  } catch (error) {
    console.error("Error during email verification:", error);
    let encodedMessage = encodeURIComponent("Server error");
    return res.redirect(
      `http://localhost:3000/login?popup=${encodedMessage}&color=red`
    );
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const resetPasswordToken = crypto.randomInt(100000, 999999).toString();

  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: `Your password reset token is ${resetPasswordToken}. It will expire in 10 minutes.`,
    });

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    if (process.env.NODE_ENV === "test") {
      return res
        .status(200)
        .json({ message: "Email sent", token: resetPasswordToken });
    }
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error("Error during password reset request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    // Hash password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  // destroy the cookies
  if (req.cookies.token) {
    res.clearCookie("token");
  }
  // destroy the session
  req.session.destroy();
  res.redirect(
    "http://localhost:3000/?popup=Logged%20out%20successfully&color=green"
  );
};

module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
};
