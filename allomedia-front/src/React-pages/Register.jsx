// src/Register.js

import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import "../css/register.css";

const Register = () => {
  function showToast(message, color) {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    if (color == "green") {
      toast.style.backgroundColor = "#def7ec";
      toast.style.color = "#046c4e";
    } else if (color == "red") {
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = {};
    if (!formData.name) {
      errors.name = "Full name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.termsAccepted) {
      errors.termsAccepted = "You must accept the terms and conditions";
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Send form data to the server

    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          return { message: "No content" };
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Registration failed");
          });
        }
      })
      .then((data) => {
        if (
          data.message ===
          "User registered successfully! Please check your email to verify your account."
        ) {
          const urlMessage = encodeURIComponent(
            "User registered successfully! Please check your email to verify your account."
          );
          window.location.href = `/register?popup=${urlMessage}&color=green`;
        } else {
          setErrors({ message: data.message });
        }
      })
      .catch((error) => {
        setErrors({ message: error.message });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <section className="register-form">
        <div className="register-inner">
          <div className="form-container">  
            <div className="form-box">
              <div className="form-content">
                <h1 className="form-title">Create an account</h1>
                <form className="form" onSubmit={handleSubmit} autoComplete="off">
                  <div className="form-group">
                    <label htmlFor="fullname" className="form-label">
                      Your full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your full name"
                      autoComplete="off"
                      required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your email"
                      autoComplete="off"
                      required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="New Password"
                      className="form-input"
                      autoComplete="off"
                      required
                    />
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      className="form-input"
                      autoComplete="off"
                      required
                    />
                    {errors.confirmPassword && (
                      <p className="error">{errors.confirmPassword}</p>
                    )}
                  </div>
                  {errors.message && <p className="error">{errors.message}</p>}
                  <div className="form-group">
                    <div className="checkbox-container">
                      <input
                        id="termsAccepted"
                        name="termsAccepted"
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        className="form-checkbox"
                        required
                      />
                      <div className="checkbox-label">
                      <label htmlFor="termsAccepted" className="form-label terms">
                        I accept the{" "}
                        <a className="terms-link" href="#">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                    </div>
                    
                  </div>
                  {errors.termsAccepted && (
                    <p className="error">{errors.termsAccepted}</p>
                  )}
                  <div className="form-footer">
                  <button type="submit" className="form-button">
                    {loading ? <div className="loader"></div> : "Create an account"}
                  </button>
                  <p className="form-footer-text">
                    Already have an account?{" "}
                    <a href="/login" className="login-link">
                      Login here
                    </a>
                  </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
