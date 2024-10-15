import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import "../css/reset.css";

const ResetPassword = () => {
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("popup");
    const color = params.get("color");

    if (message && (color === "red" || color === "green")) {
      showToast(message, color);
    }
  }, []);
  const [formData, setFormData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      window.location.href = "/login?popup=Password%20reset%20successfully&color=green";
    } else {
      setErrors(data.message);
    }
  };

  return (
    <>
    <Header />
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="token" className="form-label">
              Token
            </label>
            <input
              type="text"
              id="token"
              name="token"
              value={formData.token}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          {errors && typeof errors === "string" && (
            <p className="error-message">{errors}</p>
          )}
          <p className="info">
            If you leave without confirming the old password will be restored.
          </p>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
