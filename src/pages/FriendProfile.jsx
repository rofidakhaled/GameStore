<<<<<<< HEAD
import React, { useState } from 'react';
import { FaSteam, FaDiscord, FaTwitter, FaGamepad, FaClock, FaTrophy } from 'react-icons/fa';
import '../styles/FriendProfile.css';
=======
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Button,
  Badge,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
  Image,
} from '@chakra-ui/react';
import { FaGamepad, FaClock, FaTrophy, FaComment } from 'react-icons/fa';
>>>>>>> ce14c46ac395c48b6549296538709488e2089431

const FriendProfile = () => {
  const [friend] = useState({
    id: 1,
    name: 'Alex Johnson',
    avatar: 'https://via.placeholder.com/150',
    status: 'online',
    level: 42,
<<<<<<< HEAD
    gamesOwned: 256,
    achievements: 1543,
    playTime: '2,345',
    currentGame: 'Cyberpunk 2077',
=======
    achievements: [
      {
        id: 1,
        name: 'Night City Legend',
        game: 'Cyberpunk 2077',
        date: '2024-01-20',
      },
      {
        id: 2,
        name: 'True Cowboy',
        game: 'Red Dead Redemption 2',
        date: '2024-01-15',
      },
      {
        id: 3,
        name: 'Monster Slayer',
        game: 'The Witcher 3',
        date: '2024-01-10',
      },
    ],
    friendsCount: 89,
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
    recentGames: [
      {
        id: 1,
        name: 'Cyberpunk 2077',
        image: 'https://via.placeholder.com/150',
<<<<<<< HEAD
        playTime: '45h',
        lastPlayed: '2 hours ago'
=======
        playTime: '30 hours',
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
      },
      {
        id: 2,
        name: 'Red Dead Redemption 2',
        image: 'https://via.placeholder.com/150',
<<<<<<< HEAD
        playTime: '120h',
        lastPlayed: 'Yesterday'
=======
        playTime: '120 hours',
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
      },
      {
        id: 3,
        name: 'Elden Ring',
        image: 'https://via.placeholder.com/150',
<<<<<<< HEAD
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
=======
        playTime: '200 hours',
      },
    ],
  };

  const handleMessage = () => {
    navigate('/message');
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Box bg="gray.800" p={6} borderRadius="lg">
          <HStack spacing={6}>
            <Avatar size="2xl" src={friend.avatar} name={friend.name} />
            <VStack align="start" flex={1} spacing={3}>
              <HStack justify="space-between" width="100%">
                <Heading size="lg" color="whiteAlpha.900">
                  {friend.name}
                </Heading>
                <Badge
                  colorScheme={friend.status === 'Online' ? 'green' : 'gray'}
                  fontSize="md"
                  px={3}
                  py={1}
                >
                  {friend.status}
                </Badge>
              </HStack>
              {friend.currentGame && (
                <HStack>
                  <Icon as={FaGamepad} color="blue.400" />
                  <Text color="whiteAlpha.900">Playing {friend.currentGame}</Text>
                  <Icon as={FaClock} color="blue.400" ml={2} />
                  <Text color="whiteAlpha.900">{friend.playTime}</Text>
                </HStack>
              )}
              <HStack spacing={4}>
                <Button
                  leftIcon={<Icon as={FaComment} />}
                  colorScheme="blue"
                  onClick={handleMessage}
                >
                  Send Message
                </Button>
                <Button
                  leftIcon={<Icon as={FaGamepad} />}
                  colorScheme="green"
                  isDisabled={friend.status !== 'Online'}
                >
                  Join Game
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </Box>
>>>>>>> ce14c46ac395c48b6549296538709488e2089431

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

<<<<<<< HEAD
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
=======
        {/* Recent Games */}
        <Box>
          <Heading size="md" mb={4} color="whiteAlpha.900">
            Recent Games
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {friend.recentGames.map((game) => (
              <Box
                key={game.id}
                bg="gray.800"
                p={4}
                borderRadius="lg"
                cursor="pointer"
                onClick={() => navigate(`/game/${game.id}`)}
                transition="transform 0.2s"
                _hover={{ transform: 'translateY(-4px)' }}
              >
                <Image src={game.image} alt={game.name} borderRadius="md" mb={3} />
                <Text fontWeight="bold" color="whiteAlpha.900">{game.name}</Text>
                <HStack mt={2}>
                  <Icon as={FaClock} color="blue.400" />
                  <Text color="whiteAlpha.700">{game.playTime}</Text>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Recent Achievements */}
        <Box>
          <Heading size="md" mb={4} color="whiteAlpha.900">
            Recent Achievements
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {friend.achievements.map((achievement) => (
              <Box
                key={achievement.id}
                bg="gray.800"
                p={4}
                borderRadius="lg"
                boxShadow="md"
                transition="transform 0.2s"
                _hover={{ transform: 'translateY(-4px)' }}
              >
                <HStack spacing={4}>
                  <Icon as={FaTrophy} color="yellow.400" boxSize={6} />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" color="whiteAlpha.900">
                      {achievement.name}
                    </Text>
                    <Text color="whiteAlpha.700">{achievement.game}</Text>
                  </VStack>
                </HStack>
                <Text color="gray.500" fontSize="sm" mt={2}>
                  {achievement.date}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
  );
};

export default FriendProfile;
