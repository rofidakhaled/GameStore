import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Badge,
  SimpleGrid,
  Divider,
  Avatar,
} from '@chakra-ui/react';
import { FaSearch, FaGamepad, FaClock, FaUserPlus, FaComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
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

  const handleMessage = (friendId) => {
    navigate(`/message/${friendId}`);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading color="whiteAlpha.900">Friends</Heading>

        {/* Search Bar */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.500" />
          </InputLeftElement>
          <Input
            placeholder="Search friends..."
            bg="gray.800"
            color="whiteAlpha.900"
            _placeholder={{ color: 'gray.400' }}
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
          />
        </InputGroup>

        {/* Friends List */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {friends.map((friend) => (
            <Box
              key={friend.id}
              bg="gray.800"
              p={4}
              borderRadius="lg"
              boxShadow="md"
            >
              <HStack spacing={4}>
                <Avatar
                  size="lg"
                  src={friend.avatar}
                  name={friend.name}
                />
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
