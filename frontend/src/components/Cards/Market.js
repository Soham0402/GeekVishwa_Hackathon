import React from "react";
import { FaStore } from "react-icons/fa6";
import "./Market.css";

// Assuming your images are stored in the public/images/ folder
const marketItems = [
  { name: "Vegetable Price Trend", graphUrl: "images/vegetables_trend.jpg" },
  { name: "Pulses Price Trend", graphUrl: "images/pulses_trend.jpg" },
  { name: "Grains Price Trend", graphUrl: "images/grains_trend.jpg" },
  { name: "Others Price Trend", graphUrl: "images/others_trend.jpg" },
];

const Market = () => {
  return (
    <div className="market-container">
      <h2><FaStore /> Agricultural Market</h2>
      <p>Explore price trends of agricultural products.</p>

      <div className="market-list">
        {marketItems.map((item, index) => (
          <div key={index} className="market-card">
            <h3>{item.name}</h3>
            <img src={item.graphUrl} alt={item.name} />
            <p>Price Trend Chart</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;