import React from 'react';
import { FaGamepad, FaHeart, FaUserFriends, FaTrophy, FaClock } from 'react-icons/fa';
import './ProfileStats.css';

const ProfileStats = ({ stats }) => {
  const { totalGames, wishlistedGames, friends, achievements, totalPlaytime } = stats;

  return (
    <div className="profile-stats">
      <div className="stat-card">
        <FaGamepad className="stat-icon" />
        <div className="stat-info">
          <span className="stat-value">{totalGames}</span>
          <span className="stat-label">Games</span>
        </div>
      </div>
      <div className="stat-card">
        <FaHeart className="stat-icon" />
        <div className="stat-info">
          <span className="stat-value">{wishlistedGames}</span>
          <span className="stat-label">Wishlisted</span>
        </div>
      </div>
      <div className="stat-card">
        <FaUserFriends className="stat-icon" />
        <div className="stat-info">
          <span className="stat-value">{friends}</span>
          <span className="stat-label">Friends</span>
        </div>
      </div>
      <div className="stat-card">
        <FaTrophy className="stat-icon" />
        <div className="stat-info">
          <span className="stat-value">{achievements}</span>
          <span className="stat-label">Achievements</span>
        </div>
      </div>
      <div className="stat-card">
        <FaClock className="stat-icon" />
        <div className="stat-info">
          <span className="stat-value">{totalPlaytime}h</span>
          <span className="stat-label">Played</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
