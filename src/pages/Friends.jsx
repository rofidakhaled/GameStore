import React, { useState } from 'react';
import { FaUserFriends, FaGamepad, FaClock, FaCircle, FaPlus, FaSearch } from 'react-icons/fa';
import '../styles/Friends.css';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('online');
  const [searchQuery, setSearchQuery] = useState('');

  const friends = [
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://via.placeholder.com/40',
      status: 'online',
      currentGame: 'Cyberpunk 2077',
      lastSeen: 'Now',
      level: 42,
      gamesInCommon: 15,
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/40',
      status: 'offline',
      currentGame: null,
      lastSeen: '2 hours ago',
      level: 35,
      gamesInCommon: 8,
    },
    {
      id: 3,
      name: 'Mike Davis',
      avatar: 'https://via.placeholder.com/40',
      status: 'online',
      currentGame: 'Elden Ring',
      lastSeen: 'Now',
      level: 28,
      gamesInCommon: 12,
    },
  ];

  const friendRequests = [
    {
      id: 1,
      name: 'Emma Thompson',
      avatar: 'https://via.placeholder.com/40',
      mutualFriends: 3,
      level: 15,
    },
    {
      id: 2,
      name: 'James Wilson',
      avatar: 'https://via.placeholder.com/40',
      mutualFriends: 5,
      level: 23,
    },
  ];

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'online' && friend.status === 'online') ||
      (activeTab === 'offline' && friend.status === 'offline');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="friends-container">
      <aside className="friends-sidebar">
        <div className="search-section">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <nav className="friends-nav">
          <button
            className={`nav-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <FaUserFriends />
            <span>All Friends</span>
            <span className="count">{friends.length}</span>
          </button>
          <button
            className={`nav-button ${activeTab === 'online' ? 'active' : ''}`}
            onClick={() => setActiveTab('online')}
          >
            <FaCircle className="online-icon" />
            <span>Online</span>
            <span className="count">
              {friends.filter(f => f.status === 'online').length}
            </span>
          </button>
          <button
            className={`nav-button ${activeTab === 'offline' ? 'active' : ''}`}
            onClick={() => setActiveTab('offline')}
          >
            <FaCircle className="offline-icon" />
            <span>Offline</span>
            <span className="count">
              {friends.filter(f => f.status === 'offline').length}
            </span>
          </button>
        </nav>

        <div className="friend-requests">
          <h2>Friend Requests</h2>
          {friendRequests.map((request) => (
            <div key={request.id} className="request-card">
              <img src={request.avatar} alt={request.name} className="avatar" />
              <div className="request-info">
                <h3>{request.name}</h3>
                <p>{request.mutualFriends} mutual friends</p>
              </div>
              <div className="request-actions">
                <button className="accept-button">Accept</button>
                <button className="decline-button">Decline</button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="friends-main">
        <div className="friends-header">
          <h1>Friends List</h1>
          <button className="add-friend-button">
            <FaPlus />
            <span>Add Friend</span>
          </button>
        </div>

        <div className="friends-list">
          {filteredFriends.map((friend) => (
            <div key={friend.id} className="friend-card">
              <div className="friend-primary">
                <div className="friend-avatar">
                  <img src={friend.avatar} alt={friend.name} />
                  <span className={`status-indicator ${friend.status}`}></span>
                </div>
                <div className="friend-info">
                  <h3>{friend.name}</h3>
                  <div className="friend-meta">
                    {friend.status === 'online' && friend.currentGame ? (
                      <div className="current-game">
                        <FaGamepad className="meta-icon" />
                        <span>Playing {friend.currentGame}</span>
                      </div>
                    ) : (
                      <div className="last-seen">
                        <FaClock className="meta-icon" />
                        <span>Last online: {friend.lastSeen}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="friend-secondary">
                <div className="friend-stats">
                  <div className="stat">
                    <span className="stat-label">Level</span>
                    <span className="stat-value">{friend.level}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Games in Common</span>
                    <span className="stat-value">{friend.gamesInCommon}</span>
                  </div>
                </div>
                <button className="more-options">•••</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Friends;
