import React from 'react';
import { FaCalendar, FaUser, FaExternalLinkAlt } from 'react-icons/fa';
import './NewsCard.css';

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Extract keywords from content or generate categories based on title
  const generateTags = (article) => {
    const keywords = ['Gaming', 'News'];
    const commonGameTerms = {
      'PlayStation': ['PS5', 'PS4', 'Sony', 'PlayStation'],
      'Xbox': ['Xbox', 'Microsoft', 'Series X', 'Series S'],
      'Nintendo': ['Nintendo', 'Switch', 'Mario', 'Zelda'],
      'PC Gaming': ['PC', 'Steam', 'Epic Games'],
      'Mobile': ['Mobile', 'iOS', 'Android', 'iPhone', 'iPad'],
      'ESports': ['ESports', 'Tournament', 'Competition', 'League'],
    };

    Object.entries(commonGameTerms).forEach(([category, terms]) => {
      if (terms.some(term => 
        article.title?.toLowerCase().includes(term.toLowerCase()) || 
        article.description?.toLowerCase().includes(term.toLowerCase())
      )) {
        keywords.push(category);
      }
    });

    return [...new Set(keywords)].slice(0, 3); // Return unique tags, max 3
  };

  const tags = generateTags(article);

  return (
    <div className="news-card">
      {article.urlToImage && (
        <div className="news-image-container">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x400?text=Gaming+News';
            }}
          />
          <div className="category-tag">{tags[0]}</div>
        </div>
      )}
      <div className="news-content">
        <h3 className="news-title">{article.title}</h3>
        <p className="news-description">{article.description}</p>
        
        <div className="news-meta">
          <div className="meta-left">
            <div className="meta-item">
              <FaUser className="meta-icon" />
              <span>{article.author || 'Unknown Author'}</span>
            </div>
            <div className="meta-item">
              <FaCalendar className="meta-icon" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="read-more"
          >
            Read More <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
