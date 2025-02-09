import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WiCloud } from "react-icons/wi";
import { GiPlantWatering } from "react-icons/gi";
import { FaGamepad } from "react-icons/fa";
import { MdRecordVoiceOver } from "react-icons/md";
import "./Home.css";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", darkMode ? "light" : "dark"); // ✅ Smooth Color Change
  };

  return (
    <div className="home-container">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <h1 className="logo">CropSense AI 🌱</h1>
        <div className="nav-links">
          <button className="toggle-mode" onClick={toggleDarkMode}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/register" className="nav-btn">Register</Link>
        </div>
      </nav>

      {/* ✅ Hero Section - Fixed Layout */}
      <section 
        className="hero" 
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/farm-bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="hero-content">
          <h2>Revolutionizing Farming with <br /> <span>AI-Powered Crop Predictions</span></h2>
          <button className="cta-btn">Explore CropSense AI</button>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="features">
        <h3>Why Choose CropSense AI?</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <WiCloud className="feature-icon" />
            <h4>Real-time Weather & Soil Data</h4>
          </div>
          <div className="feature-card">
            <GiPlantWatering className="feature-icon" />
            <h4>Personalized Crop Recommendations</h4>
          </div>
          <div className="feature-card">
            <FaGamepad className="feature-icon" />
            <h4>Gamification for Eco-Friendly Farming</h4>
          </div>
          <div className="feature-card">
            <MdRecordVoiceOver className="feature-icon" />
            <h4>Voice AI Support in Regional Languages</h4>
          </div>
        </div>
      </section>

      {/* ✅ How It Works Section */}
      <section className="how-it-works">
        <h3>How CropSense AI Works?</h3>
        <div className="steps">
          <div className="step">📡 Connect Sensors</div>
          <div className="step">🌾 AI Analyzes Data</div>
          <div className="step">📊 Get Crop Insights</div>
          <div className="step">🚜 Maximize Your Yield</div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="footer">© 2024 CropSense AI - Smart Farming for a Better Future</footer>
    </div>
  );
};

export default Home;
