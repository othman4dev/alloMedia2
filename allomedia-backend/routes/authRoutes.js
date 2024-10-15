const express = require("express");
const {
  registerUser,
  loginUser,
  verifyOtp,
  verifyEmail,
  resetPassword,
  forgotPassword,
  logout,
} = require("../controllers/AuthController");
const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Verify OTP route
router.post("/verify-otp", verifyOtp);

// Verify email route
router.get("/verify-email/:token", verifyEmail);

// Forgot password route
router.post("/forgot-password", forgotPassword);

// Reset password route
router.post("/reset-password", resetPassword);

// Logout route
router.get("/logout", logout);

module.exports = router;
