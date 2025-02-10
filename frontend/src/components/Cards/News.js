import React, { useEffect, useState } from "react";
import axios from "axios";
import "./News.css";  // Ensure CSS styles are applied

const News = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchNews(page);
    }, [page]);

    const fetchNews = async (pageNum) => {
        try {
            const response = await axios.get(`http://localhost:5000/news?page=${pageNum}`);
            setArticles(response.data.articles);

            // ✅ Calculate total pages dynamically
            const totalResults = response.data.totalResults || 50;  // Default to 50 if not provided
            const pageSize = 5;  // Match this with Flask page_size
            setTotalPages(Math.ceil(totalResults / pageSize));  
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    return (
        <div className="news-container">
            <h2>Farming News</h2>
            {articles.length === 0 ? (
                <p>Loading news...</p>
            ) : (
                articles.map((news, index) => (
                    <div key={index} className="newsbox">
                        <div className="img_div">
                            <img 
                                src={news.urlToImage || "https://via.placeholder.com/200"} 
                                alt="No Image Found" 
                                height="200" 
                            />
                        </div>
                        <div className="main_news">
                            <h3>{news.title}</h3>
                            <h6>Author: {news.author || "Unknown"}</h6>
                            <h6>Published: {new Date(news.publishedAt).toLocaleString()}</h6>
                            <p>{news.description}</p>
                            <a href={news.url} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    </div>
                ))
            )}

            {/* ✅ Pagination Controls */}
            <div className="pagination">
                {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
                <span> Page {page} of {totalPages} </span>
                {page < totalPages && <button onClick={() => setPage(page + 1)}>Next</button>}
            </div>
        </div>
    );
};

export default News;