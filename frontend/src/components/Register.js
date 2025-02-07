import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"; // ✅ Import external CSS file

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/register", { username, email, password });
      setMessage("✅ Registration successful! Redirecting to Login...");
      setTimeout(() => navigate("/login", { state: { successMessage: "✅ Registration successful! Please log in." } }), 2000);
    } catch (err) {
      setMessage("❌ User already exists. Try another email.");
    }
  };

  return (
    <div className="wrapper">
      <div className="register-box">
        <h2>Register</h2>
        <p className="subtitle">Join CropSense AI today 🌱</p>

        {message && <p className={`message ${message.includes("successful") ? "success" : "error"}`}>{message}</p>}

        {/* ✅ Input fields without labels, only placeholders */}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
