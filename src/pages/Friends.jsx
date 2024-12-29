import React, { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const friends = [
    {
      id: 1,
      name: 'Alex Gaming',
      avatar: 'https://via.placeholder.com/100',
      status: 'Online',
      currentGame: 'Cyberpunk 2077',
      playTime: '2 hours',
    },
    {
      id: 2,
      name: 'Sarah Player',
      avatar: 'https://via.placeholder.com/100',
      status: 'In-Game',
      currentGame: 'Red Dead Redemption 2',
      playTime: '5 hours',
    },
    {
      id: 3,
      name: 'Mike Gamer',
      avatar: 'https://via.placeholder.com/100',
      status: 'Offline',
      lastOnline: '3 hours ago',
    },
  ];

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMessage = (friendId) => {
    navigate('/message');
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading color="whiteAlpha.900">Friends</Heading>

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
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Friends;
