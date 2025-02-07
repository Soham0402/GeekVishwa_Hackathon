import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css"; // ✅ Import external CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ Defined correctly
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      setError(location.state.successMessage); // ✅ Show success message if redirected from Register
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/login", { email, password });
      setError("✅ Login successful! Redirecting to Home...");
      setTimeout(() => navigate("/home"), 2000); // ✅ Redirect to Home after 2s
    } catch (err) {
      setError("❌ Invalid email or password.");
    }
  };

  return (
    <div className="wrapper">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
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
