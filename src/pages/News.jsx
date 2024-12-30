<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import '../styles/News.css';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Badge,
  HStack,
  Icon,
  Button,
  Divider,
} from '@chakra-ui/react';
import { FaCalendar, FaChevronRight } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
>>>>>>> ce14c46ac395c48b6549296538709488e2089431

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const articlesPerPage = 12;

<<<<<<< HEAD
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
=======
  const newsItems = [
    {
      id: 1,
      title: 'Cyberpunk 2077: Phantom Liberty Expansion',
      image: 'https://via.placeholder.com/600x400?text=Cyberpunk+2077',
      date: '2024-01-15',
      category: 'DLC',
      summary: 'CD Projekt Red announces new story expansion coming in Q2 2024.',
      tags: ['RPG', 'Action', 'Open World'],
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2 Next-Gen Update',
      image: 'https://via.placeholder.com/600x400?text=RDR2',
      date: '2024-01-10',
      category: 'Update',
      summary: 'Experience the Wild West in stunning 4K with ray tracing support.',
      tags: ['Action', 'Adventure', 'Western'],
    },
    {
      id: 3,
      title: 'Baldur\'s Gate 3 Major Content Update',
      image: 'https://via.placeholder.com/600x400?text=BG3',
      date: '2024-01-05',
      category: 'Patch',
      summary: 'Major balance changes and new content in the latest update.',
      tags: ['RPG', 'Fantasy', 'Turn-based'],
    },
    {
      id: 4,
      title: 'The Elder Scrolls VI Development Update',
      image: 'https://via.placeholder.com/600x400?text=TES6',
      date: '2024-01-01',
      category: 'Development',
      summary: 'Bethesda shares insights into the development progress.',
      tags: ['RPG', 'Fantasy', 'Open World'],
    },
    {
      id: 5,
      title: 'Starfield: Journey to the Stars',
      image: 'https://via.placeholder.com/600x400?text=Starfield',
      date: '2024-01-03',
      category: 'Update',
      summary: 'New planets and missions added in latest content update.',
      tags: ['RPG', 'Sci-Fi', 'Space'],
    },
    {
      id: 6,
      title: 'GTA VI: Vice City Returns',
      image: 'https://via.placeholder.com/600x400?text=GTA+VI',
      date: '2023-12-28',
      category: 'Announcement',
      summary: 'First look at the next Grand Theft Auto game.',
      tags: ['Action', 'Open World', 'Crime'],
    },
  ];

  const filteredNews = newsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
>>>>>>> ce14c46ac395c48b6549296538709488e2089431

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
<<<<<<< HEAD
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
=======
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading size="xl" color="whiteAlpha.900">
            Latest News
          </Heading>
        </HStack>

        {/* New Search Bar */}
        <SearchBar placeholder="Search news by title, summary, or tags..." onSearch={handleSearch} />

        {/* Featured News */}
        {!searchQuery && (
          <>
            <Box
              position="relative"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={() => navigate(`/article/${newsItems[0].id}`)}
              _hover={{ transform: 'translateY(-4px)' }}
              transition="transform 0.2s"
            >
              <Image
                src={newsItems[0].image}
                alt={newsItems[0].title}
                w="100%"
                h="400px"
                objectFit="cover"
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="rgba(0, 0, 0, 0.7)"
                p={6}
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
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
