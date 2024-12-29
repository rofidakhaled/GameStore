import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaTag, FaUser, FaSearch } from 'react-icons/fa';
import '../styles/News.css';

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const newsArticles = [
    {
      id: 1,
      title: 'Cyberpunk 2077: Phantom Liberty Expansion Revealed',
      image: 'https://via.placeholder.com/800x400',
      summary: 'CD Projekt Red announces the biggest expansion yet for Cyberpunk 2077, featuring a new district and storyline.',
      content: 'Experience Night City like never before...',
      author: 'John Smith',
      date: '2024-01-15',
      category: 'Game Updates',
      tags: ['RPG', 'Open World', 'DLC']
    },
    {
      id: 2,
      title: 'The Evolution of Gaming Graphics: Past, Present, and Future',
      image: 'https://via.placeholder.com/800x400',
      summary: 'A deep dive into how gaming graphics have evolved and what the future holds.',
      content: 'From pixel art to photorealism...',
      author: 'Sarah Johnson',
      date: '2024-01-12',
      category: 'Technology',
      tags: ['Graphics', 'Technology', 'Industry']
    },
    {
      id: 3,
      title: 'Top 10 Most Anticipated Games of 2024',
      image: 'https://via.placeholder.com/800x400',
      summary: 'Our comprehensive list of the most exciting games coming this year.',
      content: 'The gaming industry is set for an exciting year...',
      author: 'Mike Wilson',
      date: '2024-01-10',
      category: 'Features',
      tags: ['Lists', 'Preview', 'Upcoming Games']
    },
    {
      id: 4,
      title: 'Cyberpunk 2077: Phantom Liberty Expansion',
      image: 'https://via.placeholder.com/600x400?text=Cyberpunk+2077',
      summary: 'CD Projekt Red announces new story expansion coming in Q2 2024.',
      content: 'Experience a thrilling new adventure in Night City with expanded gameplay mechanics and a compelling narrative featuring new characters.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'DLC',
      tags: ['RPG', 'Action', 'Open World']
    },
    {
      id: 5,
      title: 'Red Dead Redemption 2 Next-Gen Update',
      image: 'https://via.placeholder.com/600x400?text=RDR2',
      summary: 'Experience the Wild West in stunning 4K with ray tracing support.',
      content: 'The next-gen update brings new life to this masterpiece with ray-traced global illumination and improved textures.',
      author: 'Mike Chen',
      date: '2024-01-10',
      category: 'Update',
      tags: ['Action', 'Adventure', 'Western']
    },
    {
      id: 6,
      title: 'Baldur\'s Gate 3 Major Content Update',
      image: 'https://via.placeholder.com/600x400?text=BG3',
      summary: 'Major balance changes and new content in the latest update.',
      content: 'New side quests, magical items, and combat balance adjustments await players in this massive update.',
      author: 'Alex Wright',
      date: '2024-01-05',
      category: 'Patch',
      tags: ['RPG', 'Fantasy', 'Turn-based']
    },
    {
      id: 7,
      title: 'The Elder Scrolls VI Development Update',
      image: 'https://via.placeholder.com/600x400?text=TES6',
      summary: 'Bethesda shares insights into the development progress.',
      content: 'Get a sneak peek at the ambitious scope and technological advancements in the next Elder Scrolls installment.',
      author: 'Emma Davis',
      date: '2024-01-01',
      category: 'Development',
      tags: ['RPG', 'Fantasy', 'Open World']
    },
    {
      id: 8,
      title: 'Starfield: Journey to the Stars',
      image: 'https://via.placeholder.com/600x400?text=Starfield',
      summary: 'New planets and missions added in latest content update.',
      content: 'Explore new frontiers with previously undiscovered planets and alien species.',
      author: 'John Doe',
      date: '2024-01-03',
      category: 'Update',
      tags: ['RPG', 'Sci-Fi', 'Space']
    },
    {
      id: 9,
      title: 'GTA VI: Vice City Returns',
      image: 'https://via.placeholder.com/600x400?text=GTA+VI',
      summary: 'Return to Vice City in this next-generation open-world experience.',
      content: 'Return to Vice City in this next-generation open-world experience.',
      author: 'Jane Smith',
      date: '2023-12-28',
      category: 'Announcement',
      tags: ['Action', 'Open World', 'Crime']
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchTerm) ||
      article.summary.toLowerCase().includes(searchTerm) ||
      article.category.toLowerCase().includes(searchTerm) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="news-container">
      <h1 className="news-title-main">Latest News</h1>
      
      <div className="news-filters">
        <div className="filters-row">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="popular-tags">
            <h2>Popular Tags:</h2>
            <div className="tags-list">
              <span className="tag">RPG</span>
              <span className="tag">Action</span>
              <span className="tag">Strategy</span>
              <span className="tag">Indie</span>
              <span className="tag">Updates</span>
            </div>
          </div>
        </div>
      </div>

      <div className="news-grid">
        {filteredArticles.map((article) => (
          <article key={article.id} className="news-card">
            <div className="news-image">
              <img src={article.image} alt={article.title} />
              <div className="news-category">{article.category}</div>
            </div>
            
            <div className="news-content">
              <Link to={`/article/${article.id}`} className="news-title">
                <h2>{article.title}</h2>
              </Link>
              
              <p className="news-summary">{article.summary}</p>
              
              <div className="news-meta">
                <div className="meta-item">
                  <FaUser className="meta-icon" />
                  <span>{article.author}</span>
                </div>
                <div className="meta-item">
                  <FaCalendar className="meta-icon" />
                  <span>{article.date}</span>
                </div>
                <div className="meta-item">
                  <FaTag className="meta-icon" />
                  <span>{article.tags[0]}</span>
                </div>
              </div>
              
              <div className="news-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;
