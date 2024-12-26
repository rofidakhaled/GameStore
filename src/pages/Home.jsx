import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Container,
  VStack,
  HStack,
  Badge,
  Icon,
  Progress,
  Avatar,
  Button,
  Divider,
} from '@chakra-ui/react';
import {
  FaStar,
  FaFire,
  FaTrophy,
  FaGamepad,
  FaNewspaper,
  FaChevronRight,
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const [featuredGames, setFeaturedGames] = useState([
    {
      id: 1,
      name: 'Cyberpunk 2077',
      image: 'https://via.placeholder.com/600x400?text=Cyberpunk+2077',
      rating: 4.5,
      price: 59.99,
      discount: 20,
      tags: ['RPG', 'Action', 'Open World'],
      players: 125789
    },
    {
      id: 2,
      name: 'Red Dead Redemption 2',
      image: 'https://via.placeholder.com/600x400?text=RDR2',
      rating: 4.8,
      price: 49.99,
      discount: 0,
      tags: ['Action', 'Adventure', 'Western'],
      players: 98456
    },
    {
      id: 3,
      name: 'Baldur\'s Gate 3',
      image: 'https://via.placeholder.com/600x400?text=BG3',
      rating: 4.9,
      price: 59.99,
      discount: 0,
      tags: ['RPG', 'Fantasy', 'Turn-based'],
      players: 145678
    }
  ]);

  const latestNews = [
    {
      id: 1,
      title: 'Cyberpunk 2077: Phantom Liberty Expansion',
      image: 'https://via.placeholder.com/300x200?text=Cyberpunk+DLC',
      summary: 'New story expansion coming in Q2 2024',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2 Next-Gen Update',
      image: 'https://via.placeholder.com/300x200?text=RDR2+Update',
      summary: 'Experience the Wild West in stunning 4K',
      date: '2024-01-10'
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      game: 'Cyberpunk 2077',
      name: 'Night City Legend',
      description: 'Complete all main story missions',
      image: 'https://via.placeholder.com/50x50?text=Achievement',
      rarity: 'Rare',
      progress: 100
    },
    {
      id: 2,
      game: 'Red Dead Redemption 2',
      name: 'True Cowboy',
      description: 'Achieve 100% completion',
      image: 'https://via.placeholder.com/50x50?text=Achievement',
      rarity: 'Ultra Rare',
      progress: 85
    },
    {
      id: 3,
      game: 'Baldur\'s Gate 3',
      name: 'Master Tactician',
      description: 'Win 50 battles without losing a party member',
      image: 'https://via.placeholder.com/50x50?text=Achievement',
      rarity: 'Common',
      progress: 60
    }
  ];

  const friendActivity = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40x40?text=JD',
      game: 'Cyberpunk 2077',
      action: 'just earned an achievement',
      time: '5 minutes ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://via.placeholder.com/40x40?text=JS',
      game: 'Baldur\'s Gate 3',
      action: 'started playing',
      time: '15 minutes ago'
    }
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Featured Games */}
        <Box>
          <HStack justify="space-between" mb={4}>
            <Heading size="lg" color="whiteAlpha.900">
              <Icon as={FaFire} color="red.500" mr={2} />
              Trending Games
            </Heading>
            <Button
              as={RouterLink}
              to="/store"
              variant="ghost"
              colorScheme="blue"
              rightIcon={<FaChevronRight />}
            >
              View All
            </Button>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {featuredGames.map((game) => (
              <Box
                key={game.id}
                borderRadius="lg"
                overflow="hidden"
                bg="gray.800"
                boxShadow="md"
                transition="transform 0.2s"
                _hover={{ transform: 'translateY(-4px)' }}
              >
                <Image
                  src={game.image}
                  alt={game.name}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
                <Box p={4}>
                  <VStack align="stretch" spacing={2}>
                    <Heading size="md" color="whiteAlpha.900">
                      {game.name}
                    </Heading>
                    <HStack>
                      <Icon as={FaStar} color="yellow.400" />
                      <Text color="whiteAlpha.900">{game.rating}/5</Text>
                      <Text color="whiteAlpha.600">({game.players} players)</Text>
                    </HStack>
                    <HStack spacing={2}>
                      {game.tags.map((tag, index) => (
                        <Badge key={index} colorScheme="blue">
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                    <HStack justify="space-between">
                      {game.discount > 0 ? (
                        <HStack spacing={2}>
                          <Text
                            textDecoration="line-through"
                            color="whiteAlpha.600"
                          >
                            ${game.price}
                          </Text>
                          <Text color="green.400" fontWeight="bold">
                            ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                          </Text>
                          <Badge colorScheme="green">-{game.discount}%</Badge>
                        </HStack>
                      ) : (
                        <Text color="whiteAlpha.900" fontWeight="bold">
                          ${game.price}
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Divider borderColor="gray.600" />

        {/* Latest News and Achievements */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* Latest News */}
          <Box>
            <HStack justify="space-between" mb={4}>
              <Heading size="lg" color="whiteAlpha.900">
                <Icon as={FaNewspaper} color="blue.400" mr={2} />
                Latest News
              </Heading>
              <Button
                as={RouterLink}
                to="/news"
                variant="ghost"
                colorScheme="blue"
                rightIcon={<FaChevronRight />}
              >
                More News
              </Button>
            </HStack>
            <VStack spacing={4} align="stretch">
              {latestNews.map((news) => (
                <Box
                  key={news.id}
                  bg="gray.800"
                  borderRadius="lg"
                  overflow="hidden"
                  cursor="pointer"
                  _hover={{ transform: 'translateX(4px)' }}
                  transition="transform 0.2s"
                >
                  <HStack spacing={4}>
                    <Image
                      src={news.image}
                      alt={news.title}
                      boxSize="100px"
                      objectFit="cover"
                    />
                    <VStack align="start" spacing={2} flex={1} p={2}>
                      <Heading size="sm" color="whiteAlpha.900">
                        {news.title}
                      </Heading>
                      <Text color="whiteAlpha.700" fontSize="sm">
                        {news.summary}
                      </Text>
                      <Text color="whiteAlpha.600" fontSize="xs">
                        {news.date}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Recent Achievements */}
          <Box>
            <HStack justify="space-between" mb={4}>
              <Heading size="lg" color="whiteAlpha.900">
                <Icon as={FaTrophy} color="yellow.400" mr={2} />
                Recent Achievements
              </Heading>
              <Button
                as={RouterLink}
                to="/profile"
                variant="ghost"
                colorScheme="blue"
                rightIcon={<FaChevronRight />}
              >
                View All
              </Button>
            </HStack>
            <VStack spacing={4} align="stretch">
              {recentAchievements.map((achievement) => (
                <Box
                  key={achievement.id}
                  bg="gray.800"
                  p={4}
                  borderRadius="lg"
                >
                  <HStack spacing={4}>
                    <Image
                      src={achievement.image}
                      alt={achievement.name}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <VStack align="start" spacing={1} flex={1}>
                      <HStack justify="space-between" width="100%">
                        <Heading size="sm" color="whiteAlpha.900">
                          {achievement.name}
                        </Heading>
                        <Badge
                          colorScheme={
                            achievement.rarity === 'Ultra Rare'
                              ? 'purple'
                              : achievement.rarity === 'Rare'
                              ? 'blue'
                              : 'gray'
                          }
                        >
                          {achievement.rarity}
                        </Badge>
                      </HStack>
                      <Text color="whiteAlpha.600" fontSize="sm">
                        {achievement.game}
                      </Text>
                      <Text color="whiteAlpha.800" fontSize="sm">
                        {achievement.description}
                      </Text>
                      <Progress
                        value={achievement.progress}
                        colorScheme="blue"
                        size="sm"
                        width="100%"
                      />
                      <Text color="whiteAlpha.600" fontSize="xs">
                        Progress: {achievement.progress}%
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>

        <Divider borderColor="gray.600" />

        {/* Friend Activity */}
        <Box>
          <HStack justify="space-between" mb={4}>
            <Heading size="lg" color="whiteAlpha.900">
              <Icon as={FaGamepad} color="green.400" mr={2} />
              Friend Activity
            </Heading>
            <Button
              as={RouterLink}
              to="/friends"
              variant="ghost"
              colorScheme="blue"
              rightIcon={<FaChevronRight />}
            >
              View All
            </Button>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {friendActivity.map((activity) => (
              <Box
                key={activity.id}
                bg="gray.800"
                p={4}
                borderRadius="lg"
              >
                <HStack spacing={4}>
                  <Avatar
                    src={activity.avatar}
                    name={activity.name}
                  />
                  <VStack align="start" spacing={1}>
                    <Text color="whiteAlpha.900">
                      <Text as="span" fontWeight="bold">
                        {activity.name}
                      </Text>{' '}
                      {activity.action}
                    </Text>
                    <Text color="blue.400" fontSize="sm">
                      {activity.game}
                    </Text>
                    <Text color="whiteAlpha.600" fontSize="xs">
                      {activity.time}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default Home;
