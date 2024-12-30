import React, { useState } from 'react';
<<<<<<< HEAD
import { FaUserFriends, FaGamepad, FaClock, FaCircle, FaPlus, FaSearch, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Friends.css';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('online');
=======
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
  Badge,
  SimpleGrid,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { FaGamepad, FaClock, FaComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Friends = () => {
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

<<<<<<< HEAD
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
=======
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
>>>>>>> ce14c46ac395c48b6549296538709488e2089431

  const handleMessage = (friendId) => {
    navigate('/message');
  };

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

<<<<<<< HEAD
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
                <div className="request-actions">
                  <button className="accept-button">Accept</button>
                  <button className="decline-button">Decline</button>
                </div>
              </div>
            </div>
=======
        {/* New Search Bar */}
        <SearchBar placeholder="Search friends..." onSearch={handleSearch} />

        {/* Friends List */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {filteredFriends.map((friend) => (
            <Box
              key={friend.id}
              bg="gray.800"
              p={4}
              borderRadius="lg"
              boxShadow="md"
              cursor="pointer"
              onClick={() => navigate(`/friend/${friend.id}`)}
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-2px)' }}
            >
              <HStack spacing={4}>
                <Avatar size="lg" src={friend.avatar} name={friend.name} />
                <VStack align="start" flex={1} spacing={1}>
                  <HStack justify="space-between" width="100%">
                    <Heading size="md" color="whiteAlpha.900">
                      {friend.name}
                    </Heading>
                    <Badge
                      colorScheme={
                        friend.status === 'Online'
                          ? 'green'
                          : friend.status === 'In-Game'
                          ? 'blue'
                          : 'gray'
                      }
                    >
                      {friend.status}
                    </Badge>
                  </HStack>
                  {friend.currentGame ? (
                    <HStack>
                      <Icon as={FaGamepad} color="blue.400" />
                      <Text color="whiteAlpha.700">{friend.currentGame}</Text>
                      <Icon as={FaClock} color="blue.400" ml={2} />
                      <Text color="whiteAlpha.700">{friend.playTime}</Text>
                    </HStack>
                  ) : (
                    <Text color="whiteAlpha.600">
                      Last online: {friend.lastOnline}
                    </Text>
                  )}
                  <HStack spacing={2} mt={2}>
                    <Button
                      leftIcon={<Icon as={FaComment} />}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleMessage(friend.id)}
                    >
                      Message
                    </Button>
                    <Button
                      leftIcon={<Icon as={FaGamepad} />}
                      colorScheme="green"
                      size="sm"
                      isDisabled={friend.status === 'Offline'}
                    >
                      Join Game
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
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
                <div className="friend-actions">
                  <button className="message-button" onClick={() => handleMessage(friend.id)}>
                    <FaEnvelope />
                  </button>
                  <button className="more-options">•••</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Friends;
