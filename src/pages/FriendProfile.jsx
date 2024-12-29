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

const FriendProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock friend data - in a real app, this would come from an API
  const friend = {
    id,
    name: 'Alex Gaming',
    avatar: 'https://via.placeholder.com/150',
    status: 'Online',
    currentGame: 'Cyberpunk 2077',
    playTime: '2 hours',
    level: 42,
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
    recentGames: [
      {
        id: 1,
        name: 'Cyberpunk 2077',
        image: 'https://via.placeholder.com/150',
        playTime: '30 hours',
      },
      {
        id: 2,
        name: 'Red Dead Redemption 2',
        image: 'https://via.placeholder.com/150',
        playTime: '120 hours',
      },
      {
        id: 3,
        name: 'The Witcher 3',
        image: 'https://via.placeholder.com/150',
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

        {/* Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Stat bg="gray.800" p={4} borderRadius="lg">
            <StatLabel color="gray.400">Level</StatLabel>
            <StatNumber color="whiteAlpha.900">{friend.level}</StatNumber>
          </Stat>
          <Stat bg="gray.800" p={4} borderRadius="lg">
            <StatLabel color="gray.400">Achievements</StatLabel>
            <StatNumber color="whiteAlpha.900">{friend.achievements.length}</StatNumber>
          </Stat>
          <Stat bg="gray.800" p={4} borderRadius="lg">
            <StatLabel color="gray.400">Friends</StatLabel>
            <StatNumber color="whiteAlpha.900">{friend.friendsCount}</StatNumber>
          </Stat>
        </SimpleGrid>

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
  );
};

export default FriendProfile;
