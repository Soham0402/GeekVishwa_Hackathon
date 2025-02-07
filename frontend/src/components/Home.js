import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // ✅ Import external CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to CropSense AI 🌱</h1>
      <p>Your AI-powered agriculture assistant.</p>
      <Link to="/login" className="logout-btn">Logout</Link>
    </div>
  );
};

export default Home;
