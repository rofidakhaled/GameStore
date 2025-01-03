import React, { useState } from 'react';
import { FaEdit, FaGamepad, FaHeart, FaStar, FaUserFriends } from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    username: 'JohnDoe',
    level: 42,
    xp: 8750,
    totalGames: 156,
    wishlistedGames: 24,
    friends: 89,
    recentGames: [
      { id: 1, name: 'Super Mario Odyssey', lastPlayed: '2 hours ago', playtime: '120h' },
      { id: 2, name: 'The Legend of Zelda', lastPlayed: '5 hours ago', playtime: '85h' },
      { id: 3, name: 'Animal Crossing', lastPlayed: 'Yesterday', playtime: '200h' }
    ],
    achievements: [
      { id: 1, name: 'Game Master', description: 'Complete 100 games', progress: 75 },
      { id: 2, name: 'Social Butterfly', description: 'Make 50 friends', progress: 90 },
      { id: 3, name: 'Collector', description: 'Own 200 games', progress: 60 }
    ]
  });

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="https://via.placeholder.com/150" alt="Profile" />
          <button className="edit-avatar-btn">
            <FaEdit />
          </button>
        </div>
        <div className="profile-info">
          <h1 className="username">{user.username}</h1>
          <div className="level-info">
            <span className="level">Level {user.level}</span>
            <div className="xp-bar">
              <div 
                className="xp-progress" 
                style={{ width: `${(user.xp % 1000) / 10}%` }}
              />
            </div>
            <span className="xp-text">{user.xp} XP</span>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <FaGamepad className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{user.totalGames}</span>
            <span className="stat-label">Games</span>
          </div>
        </div>
        <div className="stat-card">
          <FaHeart className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{user.wishlistedGames}</span>
            <span className="stat-label">Wishlisted</span>
          </div>
        </div>
        <div className="stat-card">
          <FaUserFriends className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{user.friends}</span>
            <span className="stat-label">Friends</span>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <section className="recent-games">
          <h2>Recent Games</h2>
          <div className="games-list">
            {user.recentGames.map(game => (
              <div key={game.id} className="game-item">
                <img 
                  src={`https://via.placeholder.com/50?text=${game.name}`} 
                  alt={game.name} 
                  className="game-icon"
                />
                <div className="game-details">
                  <h3>{game.name}</h3>
                  <div className="game-meta">
                    <span>Last played: {game.lastPlayed}</span>
                    <span>•</span>
                    <span>Playtime: {game.playtime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="achievements">
          <h2>Achievements</h2>
          <div className="achievements-list">
            {user.achievements.map(achievement => (
              <div key={achievement.id} className="achievement-item">
                <div className="achievement-icon">
                  <FaStar />
                </div>
                <div className="achievement-details">
                  <h3>{achievement.name}</h3>
                  <p>{achievement.description}</p>
                  <div className="achievement-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${achievement.progress}%` }}
                    />
                    <span className="progress-text">{achievement.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
