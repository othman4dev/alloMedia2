import React, { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    if (!sessionStorage.getItem('user')) {
      const dashboardElement = document.getElementById('dashboard');
      const logoutElement = document.getElementById('logout');
      if (dashboardElement) dashboardElement.remove();
      if (logoutElement) logoutElement.remove();
    } else {
      const loginElement = document.getElementById('login');
      const registerElement = document.getElementById('register');
      if (loginElement) loginElement.remove();
      if (registerElement) registerElement.remove();
    }
  }, []);
  return (
    <header>
      <div className="logo">
        <a href="index.html">
          <img alt="" src="images/logo.svg" />
        </a>
      </div>

      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show Menu
        </a>
        <a className="mobile-btn" href="#" title="Hide navigation">
          Hide Menu
        </a>

        <ul id="nav" className="nav">
          <li id="login">
            <a href="/login">Login</a>
          </li>
          <li id="register">
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
          <li id="dashboard">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li id="logout">
            <a href="/logout" >Logout</a>
          </li>
        </ul>
      </nav>

      <ul className="header-social">
        <li>
          <a href="https://github.com/othman4dev">
          <i class="bi bi-github"></i>
          </a>
        </li>
        <li>
          <a href="https://otmankharbouch.live">
          <i class="bi bi-code-slash"></i>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
