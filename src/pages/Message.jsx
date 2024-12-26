import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Avatar,
  Divider,
  IconButton,
  useColorModeValue,
  Textarea,
  Heading,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { FaPaperPlane, FaSmile, FaImage, FaGamepad } from 'react-icons/fa';

const Message = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      avatar: 'https://via.placeholder.com/40x40?text=JD',
      content: 'Hey, want to play some Cyberpunk 2077?',
      timestamp: '2024-01-15 14:30',
      isOnline: true,
      currentGame: 'Cyberpunk 2077'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Sure! Let me finish this quest first',
      timestamp: '2024-01-15 14:31',
      isSelf: true
    },
    {
      id: 3,
      sender: 'John Doe',
      avatar: 'https://via.placeholder.com/40x40?text=JD',
      content: 'No problem! I\'ll be in Night City',
      timestamp: '2024-01-15 14:32',
      isOnline: true,
      currentGame: 'Cyberpunk 2077'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        isSelf: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch" h="calc(100vh - 200px)">
        {/* Header */}
        <HStack spacing={4} bg="gray.800" p={4} borderRadius="lg">
          <Avatar
            src="https://via.placeholder.com/40x40?text=JD"
            name="John Doe"
          />
          <VStack align="start" spacing={1}>
            <HStack>
              <Text color="whiteAlpha.900" fontWeight="bold">
                John Doe
              </Text>
              <Badge colorScheme={true ? 'green' : 'gray'}>
                {true ? 'Online' : 'Offline'}
              </Badge>
            </HStack>
            <HStack>
              <Icon as={FaGamepad} color="blue.400" />
              <Text color="whiteAlpha.700" fontSize="sm">
                Playing Cyberpunk 2077
              </Text>
            </HStack>
          </VStack>
        </HStack>

        {/* Messages */}
        <Box
          flex={1}
          overflowY="auto"
          bg="gray.800"
          borderRadius="lg"
          p={4}
          sx={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray.500',
              borderRadius: '24px',
            },
          }}
        >
          <VStack spacing={4} align="stretch">
            {messages.map((message) => (
              <Box
                key={message.id}
                alignSelf={message.isSelf ? 'flex-end' : 'flex-start'}
                maxW="70%"
              >
                <HStack
                  spacing={2}
                  bg={message.isSelf ? 'blue.600' : 'gray.700'}
                  p={3}
                  borderRadius="lg"
                >
                  {!message.isSelf && (
                    <Avatar
                      size="sm"
                      src={message.avatar}
                      name={message.sender}
                    />
                  )}
                  <VStack align={message.isSelf ? 'end' : 'start'} spacing={1}>
                    <Text color="whiteAlpha.900">{message.content}</Text>
                    <Text color="whiteAlpha.600" fontSize="xs">
                      {message.timestamp}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Input */}
        <HStack spacing={2} bg="gray.800" p={4} borderRadius="lg">
          <IconButton
            icon={<FaImage />}
            variant="ghost"
            colorScheme="blue"
            aria-label="Send image"
          />
          <IconButton
            icon={<FaSmile />}
            variant="ghost"
            colorScheme="blue"
            aria-label="Add emoji"
          />
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            bg="gray.700"
            color="whiteAlpha.900"
            _placeholder={{ color: 'gray.400' }}
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
          />
          <IconButton
            icon={<FaPaperPlane />}
            colorScheme="blue"
            aria-label="Send message"
            onClick={handleSendMessage}
          />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Message;
