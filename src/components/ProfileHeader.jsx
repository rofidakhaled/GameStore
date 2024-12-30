import React from 'react';
import { FaEdit, FaCog, FaCircle } from 'react-icons/fa';
import StatusIndicator from './StatusIndicator';
import Badge from './Badge';
import LevelInfo from './LevelInfo';
import './ProfileHeader.css';

const ProfileHeader = ({ user, onEditProfile, onEditAvatar, onOpenSettings }) => {
  return (
    <header className="profile-header">
      <div className="profile-cover">
        <img 
          src={user.coverImage || 'https://via.placeholder.com/1200x300'} 
          alt="Profile cover" 
          className="cover-image"
        />
        <button 
          className="edit-cover-btn" 
          onClick={onEditProfile} 
          title="Change cover"
        >
          <FaEdit />
        </button>
      </div>

      <div className="profile-main">
        <div className="profile-avatar">
          <img src={user.avatar || "https://via.placeholder.com/150"} alt={user.username} />
          <button 
            className="edit-avatar-btn"
            onClick={onEditAvatar}
            title="Change avatar"
          >
            <FaEdit />
          </button>
        </div>

        <div className="profile-info">
          <div className="profile-top">
            <div className="username-container">
              <h1 className="username">{user.username}</h1>
              <div className="profile-actions">
                <button 
                  onClick={onEditProfile}
                  className="action-btn"
                  title="Edit profile"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={onOpenSettings}
                  className="action-btn"
                  title="Settings"
                >
                  <FaCog />
                </button>
              </div>
            </div>

            <div className="user-status">
              <StatusIndicator status={user.status} />
              <span className="status-text">
                {user.status}
                {user.currentGame && (
                  <>
                    <span className="separator">•</span>
                    <span className="current-game">
                      Playing {user.currentGame}
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="badges-container">
            {user.badges.map(badge => (
              <Badge
                key={badge.id}
                name={badge.name}
                iconName={badge.icon}
                description={badge.description}
              />
            ))}
          </div>

          <LevelInfo
            level={user.level}
            currentXp={user.xp}
            nextLevelXp={(user.level + 1) * 1000}
            nextReward={user.nextReward}
          />
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
