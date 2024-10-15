// src/Login.js

import React, { useState } from "react";
import { useEffect } from "react";
import "../css/login.css";
import Header from "../components/Header";

function Login() {
  function showToast(message, color) {
    const toast = document.createElement("div");

    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    if (color == "green") {
      toast.innerHTML += `<i class="bi bi-check-circle-fill"></i>`;
      toast.style.backgroundColor = "#def7ec";
      toast.style.color = "#046c4e";
    } else if (color == "red") {
      toast.innerHTML += ` <i class="bi bi-x-circle-fill"></i>`;
      toast.style.backgroundColor = "#f7dede";
      toast.style.color = "#6c0404";
    }
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "10px";
    toast.style.flexDirection = "row-reverse";
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
    }, 5000);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("popup");
    const color = params.get("color");

    if (message && (color === "red" || color === "green")) {
      showToast(message, color);
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        if (data.message === "OTP sent to your email") {
          localStorage.setItem("email", email);
          let encodedMessage2 =
            "We have sent an OTP to your email. Please enter the OTP to verify your email address.";
          window.location.href =
            "/verify?popup=" + encodedMessage2 + "&color=green";
        } else if (data.message === "Please verify your email to log in.") {
          window.location.href =
            "/login?popup=Please%20verify%20your%20email%20to%20log%20in&color=red";
        } else if (
          data.message === "User logged in successfully" ||
          data.message === "Login successfull"
        ) {
          // Store the use in the session : 
          sessionStorage.setItem("user", JSON.stringify(data.user));
          // Redirect user to dashboard
          window.location.href =
            "/?popup=Logged%20in%20successfully&color=green";
        } else {
          setError(data.message || "Login failed");
          setTimeout(() => {
            setError(null);
          }, 2000);
        }
      } else {
        setError(data.message || "Login failed");
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

  return (
    <>
      <Header />
      <section className="login-form">
        <div className="inner-form">  
          <div className="form-container">
            <div className="form-content">
              <h1 className="form-title">Sign in to your account</h1>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="form-input"
                    required
                  />
                </div>
                {error && <p className="error">{error}</p>}
                <div className="form-footer flex">
                  <div className="remember-me">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="checkbox"
                    />
                    <label htmlFor="remember" className="checkbox-label">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot" className="forgot-password">
                    Forgot password?
                  </a>
                </div>
                <button type="submit" className="login-btn">
                  {loading ? <div className="loader"></div> : "Sign in"}
                </button>
                <p className="signup-link">
                  Don’t have an account yet?{" "}
                  <a href="/register" className="signup-link-text">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
