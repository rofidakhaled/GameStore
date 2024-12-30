import React, { useState } from 'react';
import { FaDownload, FaPlay, FaClock, FaStar } from 'react-icons/fa';
import SearchInput from '../components/SearchInput';
import FilterButton from '../components/FilterButton';
import GameCard from '../components/GameCard';
import '../styles/Library.css';

const Library = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const games = [
    {
      id: 1,
      title: 'Cyberpunk 2077',
      image: 'https://via.placeholder.com/400',
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
      image: 'https://via.placeholder.com/400',
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
      image: 'https://via.placeholder.com/400',
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
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search games..."
        />

        <nav className="filter-nav">
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              label={filter.label}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            />
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
            <GameCard
              key={game.id}
              game={game}
              variant="library"
              showActions={false}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Library;
