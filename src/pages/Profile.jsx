<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import ProfileStats from '../components/ProfileStats';
import GameActivity from '../components/GameActivity';
import AchievementShowcase from '../components/AchievementShowcase';
import '../styles/Profile.css';
=======
import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Button,
  SimpleGrid,
  Icon,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import { FaGamepad, FaUsers, FaTrophy, FaClock, FaEdit, FaCamera } from 'react-icons/fa';
import { avatarImages, bannerImages } from '../assets/images';
>>>>>>> ce14c46ac395c48b6549296538709488e2089431

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: 'JohnDoe',
    level: 42,
    xp: 8750,
    status: 'Online',
    currentGame: 'Cyberpunk 2077',
    nextReward: 'Exclusive Avatar Frame',
    avatar: 'https://via.placeholder.com/150',
    coverImage: 'https://via.placeholder.com/1200x300',
    stats: {
      totalGames: 156,
      wishlistedGames: 24,
      friends: 89,
      achievements: 245,
      totalPlaytime: 1250
    },
    recentGames: [
      { 
        id: 1, 
        name: 'Cyberpunk 2077',
        image: 'https://via.placeholder.com/200x112?text=CP2077',
        lastPlayed: '2 hours ago',
        playtime: '120h',
        downloadProgress: 85,
        downloading: true,
        recentAchievements: [
          { id: 1, name: 'Night City Legend', description: 'Complete all main missions' }
        ]
      },
      { 
        id: 2,
        name: 'The Legend of Zelda',
        image: 'https://via.placeholder.com/200x112?text=TLOZ',
        lastPlayed: '5 hours ago',
        playtime: '85h',
        stats: true
      },
      { 
        id: 3,
        name: 'Animal Crossing',
        image: 'https://via.placeholder.com/200x112?text=AC',
        lastPlayed: 'Yesterday',
        playtime: '200h',
        stats: true,
        recentAchievements: [
          { id: 2, name: 'Island Paradise', description: 'Achieve 5-star island rating' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        name: 'Game Master',
        description: 'Complete 100 games',
        iconName: 'trophy',
        progress: 75,
        reward: '1000 XP'
      },
      {
        id: 2,
        name: 'Social Butterfly',
        description: 'Make 50 friends',
        iconName: 'medal',
        progress: 100,
        unlockedAt: '2 days ago',
        reward: 'Special Profile Frame'
      },
      {
        id: 3,
        name: 'Collector',
        description: 'Own 200 games',
        iconName: 'gamepad',
        progress: 60,
        reward: '500 XP'
      },
      {
        id: 4,
        name: 'Early Bird',
        description: 'Join the beta program',
        iconName: 'award',
        progress: 100,
        unlockedAt: '1 month ago',
        reward: 'Beta Tester Badge'
      }
    ],
    badges: [
      { id: 1, name: 'Early Adopter', icon: 'star', description: 'Joined during launch week' },
      { id: 2, name: 'Beta Tester', icon: 'tools', description: 'Participated in beta testing' },
      { id: 3, name: 'Premium Member', icon: 'crown', description: 'Premium subscription member' }
    ]
  });

<<<<<<< HEAD
  const handleEditProfile = () => {
    // Handle edit profile logic
  };

  const handleEditAvatar = () => {
    // Handle avatar edit logic
  };

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  const handlePlayGame = (gameId) => {
    // Handle game launch logic
  };

  const handleViewAllAchievements = () => {
    // Handle view all achievements logic
  };

  return (
    <div className="profile-container">
      <ProfileHeader 
        user={user}
        onEditProfile={handleEditProfile}
        onEditAvatar={handleEditAvatar}
        onOpenSettings={handleOpenSettings}
      />

      <ProfileStats stats={user.stats} />

      <div className="profile-content">
        <GameActivity 
          recentGames={user.recentGames}
          onPlayGame={handlePlayGame}
        />

        <AchievementShowcase 
          achievements={user.achievements}
          totalAchievements={user.stats.achievements}
          onViewAll={handleViewAllAchievements}
        />
      </div>
    </div>
=======
  const recentAchievements = [
    {
      game: 'Elden Ring',
      name: 'Master of Sorcery',
      description: 'Learn all sorceries',
    },
    {
      game: 'Cyberpunk 2077',
      name: 'Night City Legend',
      description: 'Complete all main missions',
    },
    {
      game: 'Red Dead Redemption 2',
      name: 'True Western',
      description: 'Achieve 100% completion',
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Box
          position="relative"
          height="200px"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="lg"
        >
          <Image
            src={bannerImages.featured}
            alt="Profile Banner"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Box
            position="absolute"
            bottom={-16}
            left={8}
            zIndex={2}
            borderRadius="full"
            boxShadow="lg"
            overflow="hidden"
          >
            <Avatar
              size="2xl"
              src={avatarImages.default}
              border="4px solid"
              borderColor="gray.900"
            />
          </Box>
          <Button
            position="absolute"
            bottom={4}
            right={4}
            leftIcon={<FaCamera />}
            colorScheme="blue"
            size="sm"
          >
            Change Banner
          </Button>
        </Box>

        {/* Profile Info */}
        <Box pt={12} pb={4} textAlign="center">
          <VStack spacing={2}>
            <Heading size="xl" color="whiteAlpha.900">John Doe</Heading>
            <Text color="gray.400">@johndoe</Text>
            <Button leftIcon={<FaEdit />} colorScheme="blue" size="xs">
              Edit Profile
            </Button>
          </VStack>
        </Box>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              bg="gray.800"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
            >
              <VStack>
                <Icon as={stat.icon} boxSize={6} color="blue.400" />
                <Text fontWeight="bold" fontSize="lg" color="whiteAlpha.900">
                  {stat.value}
                </Text>
                <Text color="gray.400">{stat.label}</Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Recent Achievements */}
        <Box>
          <Heading size="lg" mb={4} color="whiteAlpha.900">Recent Achievements</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {recentAchievements.map((achievement, index) => (
              <Box
                key={index}
                bg="gray.800"
                borderRadius="lg"
                p={4}
                boxShadow="lg"
              >
                <Text color="blue.400" fontWeight="bold">{achievement.game}</Text>
                <Text fontSize="md" color="whiteAlpha.900">
                  {achievement.name}
                </Text>
                <Text color="gray.400" fontSize="sm">
                  {achievement.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
  );
};

export default Profile;