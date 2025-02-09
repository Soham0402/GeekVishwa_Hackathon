import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css"; // ✅ Import external CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      setMessage(location.state.successMessage); // ✅ Show success message if redirected from Register
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/login", { email, password });
      setMessage("✅ Login successful! Redirecting to Home...");
      setTimeout(() => navigate("/dashboard"), 2000); // ✅ Redirect to Home after 2s
    } catch (err) {
      setMessage("❌ Invalid email or password.");
    }
  };

  return (
    <div className="wrapper">
      <div className="login-box">
        <h2>Login</h2>
        {message && <p className={`message ${message.includes("successful") ? "success" : "error"}`}>{message}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
