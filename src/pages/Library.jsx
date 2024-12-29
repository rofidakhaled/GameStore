import React, { useState } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Button,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Progress,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaPlay, FaDownload, FaEllipsisV, FaStar, FaClock } from 'react-icons/fa';
import { gameCoverImages } from '../assets/images';
import SearchBar from '../components/SearchBar';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const games = [
    {
      id: 1,
      name: 'Elden Ring',
      image: gameCoverImages.action[0],
      lastPlayed: '2 hours ago',
      playtime: 45,
      achievements: 28,
      installed: true,
      progress: 65,
    },
    {
      id: 2,
      name: 'Cyberpunk 2077',
      image: gameCoverImages.action[1],
      lastPlayed: 'Yesterday',
      playtime: 30,
      achievements: 15,
      installed: true,
      progress: 42,
    },
    {
      id: 3,
      name: 'The Witcher 3',
      image: gameCoverImages.rpg[0],
      lastPlayed: '3 days ago',
      playtime: 120,
      achievements: 52,
      installed: false,
      progress: 89,
    },
    {
      id: 4,
      name: 'FIFA 24',
      image: gameCoverImages.sports[0],
      lastPlayed: '1 week ago',
      playtime: 25,
      achievements: 12,
      installed: true,
      progress: 34,
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="xl" color="whiteAlpha.900">
              Your Library
            </Heading>
            <Text color="gray.400">{games.length} games</Text>
          </VStack>
          <Menu>
            <MenuButton as={Button} colorScheme="blue">
              Filter: {filter === 'all' ? 'All Games' : filter === 'installed' ? 'Installed' : 'Not Installed'}
            </MenuButton>
            <MenuList bg="gray.800" borderColor="gray.700">
              <MenuItem onClick={() => setFilter('all')} _hover={{ bg: 'gray.700' }} color="whiteAlpha.900">
                All Games
              </MenuItem>
              <MenuItem onClick={() => setFilter('installed')} _hover={{ bg: 'gray.700' }} color="whiteAlpha.900">
                Installed
              </MenuItem>
              <MenuItem onClick={() => setFilter('not-installed')} _hover={{ bg: 'gray.700' }} color="whiteAlpha.900">
                Not Installed
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        {/* Add SearchBar */}
        <SearchBar placeholder="Search your library..." onSearch={handleSearch} />

        {/* Games Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {games.map((game) => (
            <Box key={game.id} bg="gray.800" borderRadius="lg" overflow="hidden" boxShadow="lg" transition="transform 0.2s" _hover={{ transform: 'translateY(-4px)' }}>
              <Flex>
                <Image src={game.image} alt={game.name} w="200px" h="100%" objectFit="cover" />
                <Box p={4} flex="1">
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between">
                      <Heading size="md" color="whiteAlpha.900">
                        {game.name}
                      </Heading>
                      <Menu>
                        <MenuButton as={Button} variant="ghost" size="sm" color="whiteAlpha.900" _hover={{ bg: 'gray.700' }}>
                          <Icon as={FaEllipsisV} />
                        </MenuButton>
                        <MenuList bg="gray.800" borderColor="gray.700">
                          <MenuItem icon={<FaStar />} _hover={{ bg: 'gray.700' }} color="whiteAlpha.900">
                            View Achievements
                          </MenuItem>
                          <MenuItem icon={<FaClock />} _hover={{ bg: 'gray.700' }} color="whiteAlpha.900">
                            View Stats
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                    <HStack spacing={4}>
                      <Text color="gray.400">
                        <FaClock style={{ marginRight: '4px' }} />
                        {game.playtime} hours played
                      </Text>
                      <Text color="gray.400">
                        <FaStar style={{ marginRight: '4px' }} />
                        {game.achievements} achievements
                      </Text>
                    </HStack>
                    <Box>
                      <Text color="gray.400" mb={2}>
                        Progress
                      </Text>
                      <Progress value={game.progress} size="sm" colorScheme="blue" borderRadius="full" bg="gray.700" />
                    </Box>
                    <HStack>
                      <Button colorScheme="blue" leftIcon={<Icon as={game.installed ? FaPlay : FaDownload} />} flex="1">
                        {game.installed ? 'Play' : 'Install'}
                      </Button>
                      {game.installed && (
                        <Badge colorScheme="green" p={2}>
                          Installed
                        </Badge>
                      )}
                    </HStack>
                    <Text color="gray.400" fontSize="sm">
                      Last played: {game.lastPlayed}
                    </Text>
                  </VStack>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Library;
