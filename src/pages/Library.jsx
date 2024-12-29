import React, { useState } from 'react';
import { FaDownload, FaPlay, FaClock, FaEllipsisH, FaStar } from 'react-icons/fa';
import '../styles/Library.css';

const Library = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const games = [
    {
      id: 1,
      title: 'Cyberpunk 2077',
      image: 'https://via.placeholder.com/300x400',
      lastPlayed: '2 hours ago',
      playtime: 45,
      installed: true,
      status: 'Ready to play',
      achievements: 24,
      totalAchievements: 50,
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2',
      image: 'https://via.placeholder.com/300x400',
      lastPlayed: 'Yesterday',
      playtime: 120,
      installed: true,
      status: 'Ready to play',
      achievements: 35,
      totalAchievements: 70,
    },
    {
      id: 3,
      title: 'Elden Ring',
      image: 'https://via.placeholder.com/300x400',
      lastPlayed: '3 days ago',
      playtime: 80,
      installed: false,
      status: 'Not installed',
      achievements: 15,
      totalAchievements: 40,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Games' },
    { id: 'installed', label: 'Installed' },
    { id: 'notInstalled', label: 'Not Installed' },
    { id: 'recent', label: 'Recently Played' },
  ];

  const filteredGames = games.filter(game => {
    if (searchQuery) {
      return game.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    switch (activeFilter) {
      case 'installed':
        return game.installed;
      case 'notInstalled':
        return !game.installed;
      case 'recent':
        return game.lastPlayed.includes('ago') || game.lastPlayed.includes('Yesterday');
      default:
        return true;
    }
  });

  return (
    <div className="library-container">
      <aside className="library-sidebar">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <nav className="filter-nav">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        <div className="library-stats">
          <div className="stat-item">
            <span className="stat-label">Total Games</span>
            <span className="stat-value">{games.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Installed</span>
            <span className="stat-value">
              {games.filter(game => game.installed).length}
            </span>
          </div>
        </div>
      </aside>

      <main className="library-main">
        <h1>My Library</h1>

        <div className="games-grid">
          {filteredGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-image">
                <img src={game.image} alt={game.title} />
                <div className="game-actions">
                  {game.installed ? (
                    <button className="action-button primary">
                      <FaPlay />
                      <span>Play</span>
                    </button>
                  ) : (
                    <button className="action-button">
                      <FaDownload />
                      <span>Install</span>
                    </button>
                  )}
                  <button className="action-button icon-only">
                    <FaEllipsisH />
                  </button>
                </div>
              </div>

              <div className="game-info">
                <h3>{game.title}</h3>
                
                <div className="game-meta">
                  <div className="meta-item">
                    <FaClock className="meta-icon" />
                    <span>{game.playtime} hours played</span>
                  </div>
                  <div className="meta-item">
                    <FaStar className="meta-icon" />
                    <span>
                      {game.achievements}/{game.totalAchievements} achievements
                    </span>
                  </div>
                </div>

                <div className="game-status">
                  <span className={`status-badge ${game.installed ? 'installed' : 'not-installed'}`}>
                    {game.status}
                  </span>
                  <span className="last-played">Last played: {game.lastPlayed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Library;
