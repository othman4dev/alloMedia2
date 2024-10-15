import "./css/App.css";
import React from "react";
import Login from "./React-pages/Login";
import Navbar from "./components/Navbar";
import Home from "./React-pages/Home";
import Verify from "./React-pages/Verify";
import Register from "./React-pages/Register";
import Dashboard from "./React-pages/Dashboard";
import VerifyEmail from "./React-pages/VerifyEmail";
import Forgot from "./React-pages/Forgot";
import Logout from "./React-pages/Logout";
import Reset from "./React-pages/Reset";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="verify" element={<Verify />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="reset" element={<Reset />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
