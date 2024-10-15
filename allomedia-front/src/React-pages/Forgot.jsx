import React, { useState } from "react";
import Header from "../components/Header";
import "../css/forgot.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (data.message === "Email sent") {
        window.location.href = "/reset?popup=Email%20sent&color=green";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="forgot-container">
        <div className="forgot-box">
          <h2 className="forgot-title">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="forgot-field">
              <label htmlFor="email" className="forgot-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="forgot-input"
              />
            </div>
            <a href="/login" className="forgot-link">Login with password</a>
            <button type="submit" className="forgot-button">
              Send Email
            </button>
          </form>
          {message && (
            <p className="forgot-message" id="message">
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
