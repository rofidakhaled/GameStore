import React from 'react';
import { FaPlay, FaDownload, FaClock, FaTrophy } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import ProgressBar from './ProgressBar';
import './GameActivity.css';

const GameActivity = ({ recentGames, onPlayGame }) => {
  return (
    <section className="game-activity">
      <SectionHeader 
        title="Recent Activity"
        onViewAll={() => {}}
      />

      <div className="games-list">
        {recentGames.map(game => (
          <div key={game.id} className="game-activity-item">
            <div className="game-banner">
              <img src={game.image} alt={game.name} />
              {game.downloading && (
                <div className="download-overlay">
                  <ProgressBar 
                    progress={game.downloadProgress}
                    height="24px"
                    className="download-progress"
                  />
                  <span className="progress-text">{game.downloadProgress}%</span>
                </div>
              )}
            </div>

            <div className="game-info">
              <div className="game-header">
                <h3>{game.name}</h3>
                <div className="game-meta">
                  <span className="last-played">
                    <FaClock />
                    {game.lastPlayed}
                  </span>
                  <span className="playtime">
                    {game.playtime}
                  </span>
                </div>
              </div>

              {game.recentAchievements && game.recentAchievements.length > 0 && (
                <div className="recent-achievements">
                  <FaTrophy className="trophy-icon" />
                  <span>Recent Achievement: {game.recentAchievements[0].name}</span>
                </div>
              )}

              <div className="game-actions">
                {game.downloading ? (
                  <button className="action-btn pause">
                    <FaDownload /> Downloading...
                  </button>
                ) : (
                  <button 
                    className="action-btn play"
                    onClick={() => onPlayGame(game.id)}
                  >
                    <FaPlay /> Play
                  </button>
                )}
                {game.stats && (
                  <button className="action-btn stats">
                    View Stats
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameActivity;
