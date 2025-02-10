// import React, { useState, useEffect } from "react";
// import { Line, Bar } from "react-chartjs-2";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { FaChartLine, FaLeaf, FaMicrophone, FaAward, FaCloudSun, FaSeedling } from "react-icons/fa";
// import { GiFarmer, GiWheat } from "react-icons/gi";
// import { MdOutlineDashboard } from "react-icons/md";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
// import axios from "axios";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import "./Dashboard.css";
// import MapComponent from "./MapComponent"; // 📌 Import the Map Component


// // ✅ Register Chart.js Components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   const [cropPrediction, setCropPrediction] = useState(null);
//   const [recommendedCrops, setRecommendedCrops] = useState([]);
//   const [weather, setWeather] = useState({});
//   const [voiceCommand, setVoiceCommand] = useState("");

//   const { transcript, listening, resetTranscript } = useSpeechRecognition();

//   useEffect(() => {
//     fetchWeather();
//     fetchCropPrediction();
//     fetchCropRecommendation();
//   }, []);

//   useEffect(() => {
//     if (transcript) {
//       setVoiceCommand(transcript);
//       if (transcript.toLowerCase().includes("weather")) {
//         fetchWeather();
//       }
//     }
//   }, [transcript]);

//   const fetchWeather = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:5000/weather?location=Delhi");
//       setWeather(response.data);
//     } catch (error) {
//       console.error("Error fetching weather:", error);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <nav className="sidebar">
//         <h2>🌿 AgriAI Dashboard</h2>
//         <ul>
//           <li><MdOutlineDashboard /> Dashboard</li>
//           <li><FaChartLine /> AI Predictions</li>
//           <li><FaSeedling /> Crop Recommendations</li>
//           <li><FaCloudSun /> Weather & Soil Data</li>
//           <li><GiFarmer /> Farming Tips</li>
//           <li><FaAward /> Rewards & Badges</li>
//         </ul>
//       </nav>

//       <main className="dashboard-content">
//         <header className="dashboard-header">
//           <h1>🚜 AI-Powered Crop Insights</h1>
//         </header>

//         {/* ✅ AI Prediction Section */}
//         <section className="dashboard-section">
//           <h2>📊 AI-Based Yield Predictions</h2>
//           <p>Predicted Yield: <strong>{cropPrediction ? `${cropPrediction} Tons` : "Loading..."}</strong></p>
//         </section>

//         {/* ✅ AI Crop Recommendations */}
//         <section className="dashboard-section">
//           <h2>🌱 AI Crop Recommendations</h2>
//           <div className="recommendations">
//             {recommendedCrops.map((crop, index) => (
//               <div key={index} className="crop-card">🌾 {crop}</div>
//             ))}
//           </div>
//         </section>

//         {/* ✅ Weather Data */}
//         <section className="dashboard-section">
//           <h2>⛅ Live Weather & Soil Data</h2>
//           <p>🌡 Temperature: {weather.temperature}°C</p>
//           <p>💧 Humidity: {weather.humidity}%</p>
//           <p>🌬 Wind Speed: {weather.wind_speed} km/h</p>
//         </section>

//         {/* ✅ Voice AI */}
//         <section className="dashboard-section">
//           <h2>🎙️ Voice AI (Ask for Weather)</h2>
//           <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
//             {listening ? "🎤 Listening..." : "🎙️ Start Voice Command"}
//           </button>
//           <p>🎙️ {voiceCommand}</p>
//           <button onClick={resetTranscript}>🔄 Reset</button>
//         </section>

//         {/* ✅ Map */}
//         <section className="dashboard-section">
//           <h2>🗺️ Crop Suitability Map</h2>
//           <MapComponent />
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import { 
  FaSeedling, FaStore, FaAward, FaChartBar, 
  FaBars, FaHouse, FaComments, FaArrowTrendUp,
  FaRightFromBracket, FaXmark, FaNewspaper
} from "react-icons/fa6";
import { motion } from "framer-motion";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

// Mock User Data
const user = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  profilePic: "https://randomuser.me/api/portraits/men/75.jpg"
};

const PlantAnimation = () => {
    return (
      <div className="plant-container">
        {[...Array(6)].map((_, index) => (
          <img 
            key={index} 
            src={`${process.env.PUBLIC_URL}/images/plant.svg`} 
            className="plant"
            style={{ 
              left: `${Math.random() * 95}%`, 
              animationDelay: `${index * 2}s`,
              bottom: `${Math.random() * 8 + 2}%` /* ✅ Adjusted Height Above Cards */
            }}
            alt="Growing Tree"
          />
        ))}
      </div>
    );
  };
  
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* ✅ Animated Plants in the Background */}
      <PlantAnimation />

      {/* Navbar */}
      <nav className="navbar">
        <FaBars className="menu-icon" onClick={() => setSidebarOpen(true)} />
        <h1>CropSense AI 🌱</h1>
        <div className="nav-links">
          <span onClick={() => navigate("/home")}><FaHouse /> Home</span>
          <span onClick={() => navigate("/feedback")}><FaComments /> Feedback</span>
          <span onClick={() => navigate("/login")}><FaRightFromBracket /> Logout</span>
        </div>
      </nav>

      {/* Rest of the component remains the same */}
      <motion.div 
        className="sidebar"
        initial={{ x: "-100%" }}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <FaXmark className="close-icon" onClick={() => setSidebarOpen(false)} />
        <img src={user.profilePic} alt="Profile" className="profile-pic" />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </motion.div>

      <main className="dashboard-content">
        <h2>🚀 Explore CropSense AI Features</h2>

        <div className="card-grid">
          <div className="card" onClick={() => navigate("/yield")}><FaChartBar className="icon" /><p>Crop Yield</p></div>
          <div className="card" onClick={() => navigate("/recommendation")}><FaSeedling className="icon" /><p>Crop Recommendation</p></div>
          <div className="card" onClick={() => navigate("/market")}><FaArrowTrendUp className="icon" /><p>Market</p></div>
          <div className="card" onClick={() => navigate("/shop")}><FaStore className="icon" /><p>Shop</p></div>
          <div className="card" onClick={() => navigate("/news")}><FaNewspaper className="icon" /><p>News</p></div>
          <div className="card" onClick={() => navigate("/knowledgeCorner")}><FaAward className="icon" /><p>Knowledge Corner</p></div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;



