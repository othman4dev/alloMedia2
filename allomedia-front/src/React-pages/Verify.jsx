import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import "../css/verify.css";

const Verify = () => {
  function showToast(message, color) {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    if (color === "green") {
      toast.style.backgroundColor = "#def7ec";
      toast.style.color = "#046c4e";
    } else if (color === "red") {
      toast.style.backgroundColor = "#f7dede";
      toast.style.color = "#6c0404";
    }
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease-in-out";

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 3000);
  }

  function resendOTP() {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      showToast("Email not found in localStorage", "red");
      return;
    }

    fetch("http://localhost:5000/resend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: storedEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Email sent") {
          showToast("Email sent", "green");
        } else {
          showToast(data.message || "Failed to resend email", "red");
        }
      })
      .catch((error) => {
        console.error("Error resending email:", error);
        showToast("An error occurred. Please try again later.", "red");
      });
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("popup");
    const color = params.get("color");

    if (message && (color === "red" || color === "green")) {
      showToast(message, color);
    }
  }, []);
  const [otpC, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otpC.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpC.join("");
    setLoading(true);
    // Add your verification logic here
    // Post to /api/auth/verify-otp
    // with email and otpCode
    // Redirect to dashboard if successful
    try {
      const storedEmail = localStorage.getItem("email");
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: storedEmail,
            otp,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        if (data.message === "OTP verified successfully, login successfull") {
          sessionStorage.setItem("user", JSON.stringify(data.user));
          // Redirect user to dashboard
          window.location.href = "/?popup=Logged%20in%20successfully&color=green";
        } else {
          setError(data.message || "OTP verification failed");
          setTimeout(() => {
            setError(null);
          }, 2000);
        }
      } else {
        setError(data.message || "Server Error");
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("otp-form");
    const inputs = [...form.querySelectorAll("input[type=text]")];
    const submit = form.querySelector("button[type=submit]");

    const handleKeyDown = (e) => {
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "Tab" &&
        !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        const index = inputs.indexOf(e.target);
        if (index > 0) {
          inputs[index - 1].value = "";
          inputs[index - 1].focus();
        }
      }
    };

    const handleInput = (e) => {
      const { target } = e;
      const index = inputs.indexOf(target);
      if (target.value) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          submit.focus();
        }
      }
    };

    const handleFocus = (e) => {
      e.target.select();
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
        return;
      }
      const digits = text.split("");
      inputs.forEach((input, index) => (input.value = digits[index]));
      submit.focus();
    };

    inputs.forEach((input) => {
      input.addEventListener("input", handleInput);
      input.addEventListener("keydown", handleKeyDown);
      input.addEventListener("focus", handleFocus);
      input.addEventListener("paste", handlePaste);
    });
  });
  return (
    <>
      <Header />
      <div className="verify-form">
        <div className="inner-verify">
          <header className="verify-header">
            <h1>OTP Verification</h1>
            <p>Enter the 6-digit verification code that was sent to your email.</p>
          </header>
          <form id="otp-form" onSubmit={handleSubmit}>
            <input
              type="hidden"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="otp-inputs">
              {otpC.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  className="otp-inp"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="submit-container">
              <button type="submit" className="submit-btn">
                {loading ? <div className="loader"></div> : "Verify"}
              </button>
            </div>
          </form>
          <div className="resend-container">
            Didn't receive code?{" "}
            <a className="resend-link" onClick={resendOTP}>
              Resend
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
