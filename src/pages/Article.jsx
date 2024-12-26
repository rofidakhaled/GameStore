import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Image,
  HStack,
  Icon,
  Badge,
  Divider,
  Button,
  Avatar,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { FaCalendar, FaTag, FaHeart, FaComment, FaShare } from 'react-icons/fa';

const Article = () => {
  const { id } = useParams();
  const toast = useToast();

  // Mock article data
  const article = {
    id: 1,
    title: 'Cyberpunk 2077: Phantom Liberty Expansion Revealed',
    image: 'https://via.placeholder.com/1200x600?text=Cyberpunk+2077+Expansion',
    date: '2024-01-15',
    category: 'DLC',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://via.placeholder.com/40x40?text=SJ',
      role: 'Gaming Editor'
    },
    content: `
      CD Projekt Red has officially announced the highly anticipated expansion for Cyberpunk 2077, titled "Phantom Liberty." This massive content update promises to bring a new district to Night City, complete with its own storylines, characters, and gameplay mechanics.

      The expansion introduces players to a previously unexplored section of Night City, where corporate intrigue and street-level conflicts intertwine in a narrative that promises to be as compelling as the base game. New characters will be introduced, each with their own motivations and storylines that players can explore.

      Key Features:
      - New district with unique architecture and atmosphere
      - Additional storylines and side quests
      - New weapons and cybernetic enhancements
      - Enhanced gameplay mechanics
      - New characters voiced by top talent

      The development team has focused on creating a seamless integration with the base game while pushing the boundaries of what's possible in Night City. Players can expect the same level of detail and polish that they've come to expect from CD Projekt Red.

      The expansion will be available in Q2 2024 and will require the base game to play. Players who pre-order will receive exclusive in-game items and cosmetics.
    `,
    tags: ['RPG', 'Action', 'Open World'],
    likes: 1247,
    comments: [
      {
        id: 1,
        author: 'Mike Chen',
        avatar: 'https://via.placeholder.com/40x40?text=MC',
        content: 'Can\'t wait to explore the new district! The base game was amazing.',
        timestamp: '2 hours ago',
        likes: 45
      },
      {
        id: 2,
        author: 'Emma Watson',
        avatar: 'https://via.placeholder.com/40x40?text=EW',
        content: 'The new features sound promising. Hope they add more character customization options.',
        timestamp: '1 hour ago',
        likes: 23
      }
    ]
  };

  const handleLike = () => {
    toast({
      title: 'Article Liked',
      description: 'This article has been added to your favorites',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleShare = () => {
    toast({
      title: 'Link Copied',
      description: 'Article link has been copied to clipboard',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Image
            src={article.image}
            alt={article.title}
            borderRadius="lg"
            w="100%"
            h="400px"
            objectFit="cover"
          />
          <VStack align="start" spacing={4} mt={6}>
            <Badge colorScheme="blue" fontSize="sm">
              {article.category}
            </Badge>
            <Heading color="whiteAlpha.900">{article.title}</Heading>
            <HStack spacing={6} color="whiteAlpha.700">
              <HStack>
                <Icon as={FaCalendar} />
                <Text>{article.date}</Text>
              </HStack>
              <HStack>
                <Avatar
                  size="sm"
                  src={article.author.avatar}
                  name={article.author.name}
                />
                <VStack spacing={0} align="start">
                  <Text color="whiteAlpha.900">{article.author.name}</Text>
                  <Text fontSize="sm">{article.author.role}</Text>
                </VStack>
              </HStack>
            </HStack>
          </VStack>
        </Box>

        <Divider borderColor="gray.600" />

        {/* Content */}
        <Box color="whiteAlpha.900">
          {article.content.split('\n').map((paragraph, index) => (
            <Text key={index} mb={4}>
              {paragraph}
            </Text>
          ))}
        </Box>

        {/* Tags */}
        <HStack spacing={2}>
          {article.tags.map((tag, index) => (
            <Badge key={index} colorScheme="gray">
              {tag}
            </Badge>
          ))}
        </HStack>

        <Divider borderColor="gray.600" />

        {/* Actions */}
        <HStack spacing={4}>
          <Button
            leftIcon={<Icon as={FaHeart} />}
            colorScheme="red"
            variant="ghost"
            onClick={handleLike}
          >
            {article.likes} Likes
          </Button>
          <Button
            leftIcon={<Icon as={FaComment} />}
            colorScheme="blue"
            variant="ghost"
          >
            {article.comments.length} Comments
          </Button>
          <Button
            leftIcon={<Icon as={FaShare} />}
            colorScheme="green"
            variant="ghost"
            onClick={handleShare}
          >
            Share
          </Button>
        </HStack>

        {/* Comments */}
        <VStack spacing={4} align="stretch">
          <Heading size="md" color="whiteAlpha.900">
            Comments
          </Heading>
          
          <Box bg="gray.800" p={4} borderRadius="lg">
            <VStack spacing={4} align="stretch">
              <Textarea
                placeholder="Add a comment..."
                bg="gray.700"
                color="whiteAlpha.900"
                borderColor="gray.600"
                _hover={{ borderColor: 'gray.500' }}
                _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
              />
              <Button colorScheme="blue" alignSelf="flex-end">
                Post Comment
              </Button>
            </VStack>
          </Box>

          {article.comments.map((comment) => (
            <Box
              key={comment.id}
              bg="gray.800"
              p={4}
              borderRadius="lg"
            >
              <HStack spacing={4} align="start">
                <Avatar
                  size="sm"
                  src={comment.avatar}
                  name={comment.author}
                />
                <VStack align="start" spacing={1} flex={1}>
                  <HStack justify="space-between" w="100%">
                    <Text color="whiteAlpha.900" fontWeight="bold">
                      {comment.author}
                    </Text>
                    <Text color="whiteAlpha.600" fontSize="sm">
                      {comment.timestamp}
                    </Text>
                  </HStack>
                  <Text color="whiteAlpha.800">{comment.content}</Text>
                  <HStack>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      leftIcon={<Icon as={FaHeart} />}
                    >
                      {comment.likes}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                    >
                      Reply
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Article;
