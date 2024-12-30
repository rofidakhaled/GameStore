import React, { useState } from 'react';
<<<<<<< HEAD
import { FaDownload, FaPlay, FaClock, FaStar } from 'react-icons/fa';
import SearchInput from '../components/SearchInput';
import FilterButton from '../components/FilterButton';
import GameCard from '../components/GameCard';
import '../styles/Library.css';
=======
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
>>>>>>> ce14c46ac395c48b6549296538709488e2089431

const Library = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const games = [
    {
      id: 1,
      title: 'Cyberpunk 2077',
      image: 'https://via.placeholder.com/400',
      lastPlayed: '2 hours ago',
      playtime: 45,
      installed: true,
      status: 'Ready to play',
      achievements: 24,
      totalAchievements: 50,
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2',
      image: 'https://via.placeholder.com/400',
      lastPlayed: 'Yesterday',
      playtime: 120,
      installed: true,
      status: 'Ready to play',
      achievements: 35,
      totalAchievements: 70,
    },
    {
      id: 3,
      title: 'Elden Ring',
      image: 'https://via.placeholder.com/400',
      lastPlayed: '3 days ago',
      playtime: 80,
      installed: false,
      status: 'Not installed',
      achievements: 15,
      totalAchievements: 40,
    },
  ];

<<<<<<< HEAD
  const filters = [
    { id: 'all', label: 'All Games' },
    { id: 'installed', label: 'Installed' },
    { id: 'notInstalled', label: 'Not Installed' },
    { id: 'recent', label: 'Recently Played' },
  ];

  const filteredGames = games.filter(game => {
    if (searchQuery) {
      return game.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    switch (activeFilter) {
      case 'installed':
        return game.installed;
      case 'notInstalled':
        return !game.installed;
      case 'recent':
        return game.lastPlayed.includes('ago') || game.lastPlayed.includes('Yesterday');
      default:
        return true;
    }
  });

  return (
    <div className="library-container">
      <aside className="library-sidebar">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search games..."
        />

        <nav className="filter-nav">
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              label={filter.label}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            />
=======
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
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
          ))}
        </nav>

        <div className="library-stats">
          <div className="stat-item">
            <span className="stat-label">Total Games</span>
            <span className="stat-value">{games.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Installed</span>
            <span className="stat-value">
              {games.filter(game => game.installed).length}
            </span>
          </div>
        </div>
      </aside>

      <main className="library-main">
        <h1>My Library</h1>

        <div className="games-grid">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              variant="library"
              showActions={false}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Library;
