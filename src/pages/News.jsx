import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import '../styles/News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const articlesPerPage = 12;

  const API_KEY = 'e3424b28b41d4d90b3912883ab57a706';
  const BASE_URL = 'https://newsapi.org/v2/everything';

  const fetchNews = async (query = '', page = 1) => {
    setLoading(true);
    setError(null);
    try {
      let searchTerm;
      if (query) {
        searchTerm = `(${query}) AND (video games OR gaming OR game development OR esports)`;
      } else {
        searchTerm = '(video games OR gaming OR PlayStation OR Xbox OR Nintendo OR Steam OR Epic Games) AND (release OR update OR announcement OR review OR launch)';
      }

      const response = await axios.get(BASE_URL, {
        params: {
          q: searchTerm,
          apiKey: API_KEY,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: articlesPerPage,
          page: page,
          domains: 'ign.com,gamespot.com,eurogamer.net,polygon.com,kotaku.com,pcgamer.com,rockpapershotgun.com,vg247.com,gamesradar.com,destructoid.com'
        }
      });
      
      const gamingKeywords = ['game', 'gaming', 'playstation', 'xbox', 'nintendo', 'pc', 'steam', 'epic games', 
        'release', 'update', 'dlc', 'expansion', 'patch', 'console', 'developer', 'studio'];
      
      const filteredArticles = response.data.articles.filter(article => {
        const content = (article.title + ' ' + article.description).toLowerCase();
        return gamingKeywords.some(keyword => content.includes(keyword));
      });

      setArticles(filteredArticles);
      setTotalResults(Math.min(response.data.totalResults, 100)); // News API limits to 100 results
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews('', currentPage);
  }, [currentPage]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
    if (value.length >= 3) {
      fetchNews(value, 1);
    } else if (value.length === 0) {
      fetchNews('', 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', label: 'All News' },
    { id: 'games', label: 'Games' },
    { id: 'playstation', label: 'PlayStation' },
    { id: 'xbox', label: 'Xbox' },
    { id: 'nintendo', label: 'Nintendo' },
    { id: 'pc', label: 'PC Gaming' },
  ];

  const totalPages = Math.ceil(totalResults / articlesPerPage);

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>Gaming News</h1>
        <div className="news-filters">
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search gaming news..."
          />
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-button ${category === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setCategory(cat.id);
                  setCurrentPage(1);
                  fetchNews(cat.label === 'All News' ? '' : cat.label, 1);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading news...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="news-grid">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default News;
