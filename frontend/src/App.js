import React, {} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";  // <-- Adjust path if necessary
import Register from "./components/Register";  // <-- Adjust path if necessary
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import CropRecommendation from "./components/Cards/CropRecommendation";
import CropYield from "./components/Cards/CropYield";
import News from "./components/Cards/News";
import Market from "./components/Cards/Market";
import Shop from "./components/Cards/Shop";
import KnowledgeCorner from "./components/Cards/KnowledgeCorner";


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
        <Route path="/yield" element={<CropYield />} />
        <Route path="/news" element={<News />} />
        <Route path="/market" element={<Market />} /> 
        <Route path="/shop" element={<Shop />} /> 
        <Route path="/knowledgeCorner" element={<KnowledgeCorner />} />
      </Routes>
    </Router>
  );
}

export default App;