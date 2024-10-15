import React from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import "../css/home.css";

const Home = () => {
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
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Welcome to AlloMedia</h1>
          <p className="home-description">
            You have successfully created an account
          </p>
          <button className="home-button">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
