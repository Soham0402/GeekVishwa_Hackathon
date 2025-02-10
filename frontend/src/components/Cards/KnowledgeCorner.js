import React from "react";
import "./KnowledgeCorner.css";

const knowledgeItems = [
    { name: "Video 1", url: "https://www.youtube.com/watch?v=9bfz0QqU5eI", thumbnail: "https://img.youtube.com/vi/9bfz0QqU5eI/maxresdefault.jpg" },
    { name: "Video 2", url: "https://www.youtube.com/watch?v=HPzFbaVqKow", thumbnail: "https://img.youtube.com/vi/HPzFbaVqKow/maxresdefault.jpg" },
    { name: "Video 3", url: "https://www.youtube.com/watch?v=uzkCQfNC_MU", thumbnail: "https://img.youtube.com/vi/uzkCQfNC_MU/maxresdefault.jpg" },
  ];

const KnowledgeCorner = () => {
  return (
    <div className="knowledge-container">
      <h2>Knowledge Corner</h2>
      <p>Explore educational videos and enhance your skills!</p>

      <div className="knowledge-list">
        {knowledgeItems.map((item, index) => (
          <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="knowledge-card">
            <img src={item.thumbnail} alt={item.name} className="knowledge-thumbnail" />
            <div className="knowledge-title">{item.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeCorner;