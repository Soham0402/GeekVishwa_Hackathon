import React, {} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";  // <-- Adjust path if necessary
import Register from "./components/Register";  // <-- Adjust path if necessary
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import CropRecommendation from "./components/Cards/CropRecommendation";


function App() {
  //const [authToken, setAuthToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Correctly defined */}
        <Route path="/register" element={<Register />} /> {/* ✅ Fixes issue */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommendation" element={<CropRecommendation />} />
      </Routes>
    </Router>
  );
}

export default App;