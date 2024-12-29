import React, { useState } from 'react';
import { FaSteam, FaDiscord, FaTwitter, FaGamepad, FaClock, FaTrophy } from 'react-icons/fa';
import '../styles/FriendProfile.css';

const FriendProfile = () => {
  const [friend] = useState({
    id: 1,
    name: 'Alex Johnson',
    avatar: 'https://via.placeholder.com/150',
    status: 'online',
    level: 42,
    gamesOwned: 256,
    achievements: 1543,
    playTime: '2,345',
    currentGame: 'Cyberpunk 2077',
    recentGames: [
      {
        id: 1,
        name: 'Cyberpunk 2077',
        image: 'https://via.placeholder.com/150',
        playTime: '45h',
        lastPlayed: '2 hours ago'
      },
      {
        id: 2,
        name: 'Red Dead Redemption 2',
        image: 'https://via.placeholder.com/150',
        playTime: '120h',
        lastPlayed: 'Yesterday'
      },
      {
        id: 3,
        name: 'Elden Ring',
        image: 'https://via.placeholder.com/150',
        playTime: '80h',
        lastPlayed: '3 days ago'
      }
    ],
    socialLinks: {
      steam: 'alexj_gaming',
      discord: 'AlexJ#1234',
      twitter: '@alexj_gaming'
    }
  });

  return (
    <div className="friend-profile-container">
      <main className="friend-profile-main">
        <div className="profile-header">
          <div className="profile-info">
            <img src={friend.avatar} alt={friend.name} className="profile-avatar" />
            <div className="profile-details">
              <div className="profile-name-status">
                <h1>{friend.name}</h1>
                <span className={`status-badge ${friend.status}`}>{friend.status}</span>
              </div>
              <div className="social-links">
                <a href="#" className="social-link">
                  <FaSteam />
                  <span>{friend.socialLinks.steam}</span>
                </a>
                <a href="#" className="social-link">
                  <FaDiscord />
                  <span>{friend.socialLinks.discord}</span>
                </a>
                <a href="#" className="social-link">
                  <FaTwitter />
                  <span>{friend.socialLinks.twitter}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <FaGamepad />
              <div className="stat-content">
                <span className="stat-value">{friend.gamesOwned}</span>
                <span className="stat-label">Games Owned</span>
              </div>
            </div>
            <div className="stat-item">
              <FaClock />
              <div className="stat-content">
                <span className="stat-value">{friend.playTime}h</span>
                <span className="stat-label">Play Time</span>
              </div>
            </div>
            <div className="stat-item">
              <FaTrophy />
              <div className="stat-content">
                <span className="stat-value">{friend.achievements}</span>
                <span className="stat-label">Achievements</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <section className="current-activity">
            <h2>Currently Playing</h2>
            {friend.currentGame && (
              <div className="current-game">
                <div className="game-status">
                  <span className="status-dot"></span>
                  <span>In-Game</span>
                </div>
                <h3>{friend.currentGame}</h3>
              </div>
            )}
          </section>

          <section className="recent-activity">
            <h2>Recent Games</h2>
            <div className="recent-games">
              {friend.recentGames.map(game => (
                <div key={game.id} className="game-card">
                  <img src={game.image} alt={game.name} />
                  <div className="game-info">
                    <h3>{game.name}</h3>
                    <div className="game-stats">
                      <span className="playtime">{game.playTime}</span>
                      <span className="last-played">{game.lastPlayed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="friend-actions">
            <button className="action-button primary">Send Message</button>
            <button className="action-button">Invite to Game</button>
            <button className="action-button">View Full Library</button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FriendProfile;
