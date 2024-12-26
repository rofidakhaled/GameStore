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
  Flex,
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
    <Flex direction="column" h="calc(100vh - 60px)" overflow="hidden">
      <Container maxW="container.xl" h="full" py={4}>
        <VStack spacing={4} h="full">
          {/* Header */}
          <HStack w="full" spacing={4} bg="gray.800" p={4} borderRadius="lg">
            <Avatar
              src="https://via.placeholder.com/40x40?text=JD"
              name="John Doe"
            />
            <VStack align="start" spacing={1} flex={1}>
              <HStack>
                <Text fontWeight="bold">
                  John Doe
                </Text>
                <Badge colorScheme="green">
                  Online
                </Badge>
              </HStack>
              <HStack>
                <Icon as={FaGamepad} color="blue.400" />
                <Text fontSize="sm" color="gray.300">
                  Playing Cyberpunk 2077
                </Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Messages */}
          <Box
            flex={1}
            w="full"
            overflowY="auto"
            bg="gray.800"
            borderRadius="lg"
            p={4}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#4A5568',
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
                      <Text>{message.content}</Text>
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
          <HStack w="full" spacing={2} bg="gray.800" p={4} borderRadius="lg">
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
              flex={1}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              bg="gray.700"
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
    </Flex>
  );
};

export default Message;
