import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";  // <-- Adjust path if necessary
import Register from "./components/Register";  // <-- Adjust path if necessary
import Home from "./components/Home";

function App() {
  const [authToken, setAuthToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} /> {/* ✅ Correctly defined */}
        <Route path="/register" element={<Register />} /> {/* ✅ Fixes issue */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;