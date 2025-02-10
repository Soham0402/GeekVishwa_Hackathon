import React from "react";
import { FaStore } from "react-icons/fa6";
import ".//Shop.css";

const marketItems = [
  { name: "Organic Fertilizers", url: "https://www.amazon.in/s?k=organic+fertilizer" },
  { name: "Pesticides", url: "https://www.flipkart.com/search?q=pesticides" },
  { name: "Irrigation Equipment", url: "https://www.indiamart.com/proddetail/irrigation-equipment" },
  { name: "Tractors & Machinery", url: "https://www.tractorjunction.com/" },
  { name: "Seeds & Saplings", url: "https://www.amazon.in/s?k=seeds+for+farming" },
];

const Shop = () => {
  return (
    <div className="market-container">
      <h2><FaStore /> Agricultural Market</h2>
      <p>Explore trusted sources for agricultural products.</p>

      <div className="market-list">
        {marketItems.map((item, index) => (
          <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="market-card">
            {item.name} ➡
          </a>
        ))}
      </div>
    </div>
  );
};

export default Shop;