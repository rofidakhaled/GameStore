import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Image,
  Text,
  Heading,
  Button,
  HStack,
  VStack,
  Icon,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Progress,
  Spinner,
  useToast,
  Avatar,
  Input,
  Textarea,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { 
  FaShoppingCart, 
  FaBell, 
  FaHeart, 
  FaStar, 
  FaDownload, 
  FaUsers, 
  FaCalendar, 
  FaGamepad,
  FaThumbsUp,
  FaReply,
  FaEllipsisV,
  FaTrash,
  FaEdit,
} from 'react-icons/fa';
import axios from 'axios';

const CommentSection = ({ gameId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40x40?text=JD',
        isVerified: true,
      },
      content: 'This game is absolutely amazing! The graphics and gameplay are top-notch.',
      timestamp: '2024-12-26T20:00:00',
      likes: 15,
      replies: [
        {
          id: 2,
          user: {
            name: 'Jane Smith',
            avatar: 'https://via.placeholder.com/40x40?text=JS',
            isVerified: false,
          },
          content: 'I agree! The story is particularly engaging.',
          timestamp: '2024-12-26T20:30:00',
          likes: 5,
        }
      ]
    },
    {
      id: 3,
      user: {
        name: 'Mike Wilson',
        avatar: 'https://via.placeholder.com/40x40?text=MW',
        isVerified: false,
      },
      content: 'The multiplayer mode is really fun with friends. Highly recommended!',
      timestamp: '2024-12-26T19:00:00',
      likes: 8,
      replies: []
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const toast = useToast();

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: {
        name: 'Current User',
        avatar: 'https://via.placeholder.com/40x40?text=CU',
        isVerified: true,
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
    
    toast({
      title: 'Comment Added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleAddReply = (commentId) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: Date.now(),
      user: {
        name: 'Current User',
        avatar: 'https://via.placeholder.com/40x40?text=CU',
        isVerified: true,
      },
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    setComments(comments.map(comment => 
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyingTo(null);
    setReplyContent('');
    
    toast({
      title: 'Reply Added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const Comment = ({ comment, isReply = false, parentId = null }) => (
    <VStack align="stretch" spacing={4} w="100%">
      <HStack spacing={4}>
        <Avatar src={comment.user.avatar} name={comment.user.name} size="sm" />
        <VStack align="start" flex={1} spacing={1}>
          <HStack>
            <Text fontWeight="bold">{comment.user.name}</Text>
            {comment.user.isVerified && (
              <Badge colorScheme="blue">Verified</Badge>
            )}
            <Text fontSize="sm" color="gray.500">
              {formatTimestamp(comment.timestamp)}
            </Text>
          </HStack>
          <Text color="whiteAlpha.900">{comment.content}</Text>
          <HStack spacing={4}>
            <Button
              size="sm"
              leftIcon={<FaThumbsUp />}
              variant="ghost"
              onClick={() => handleLike(comment.id, isReply, parentId)}
            >
              {comment.likes} Likes
            </Button>
            {!isReply && (
              <Button
                size="sm"
                leftIcon={<FaReply />}
                variant="ghost"
                onClick={() => setReplyingTo(comment.id)}
              >
                Reply
              </Button>
            )}
          </HStack>
        </VStack>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisV />}
            variant="ghost"
            size="sm"
          />
          <MenuList bg="gray.800">
            <MenuItem icon={<FaEdit />} command="⌘E" bg="gray.800" _hover={{ bg: 'gray.700' }}>
              Edit
            </MenuItem>
            <MenuItem icon={<FaTrash />} command="⌘D" bg="gray.800" _hover={{ bg: 'gray.700' }}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {replyingTo === comment.id && (
        <Box pl={12}>
          <VStack align="stretch" spacing={2}>
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              bg="gray.800"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
            />
            <HStack justify="flex-end" spacing={2}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => handleAddReply(comment.id)}
              >
                Reply
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {!isReply && comment.replies?.length > 0 && (
        <VStack align="stretch" spacing={4} pl={12}>
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              isReply={true}
              parentId={comment.id}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );

  return (
    <VStack align="stretch" spacing={6}>
      <VStack align="stretch" spacing={4}>
        <Heading size="md" color="whiteAlpha.900">Comments</Heading>
        <VStack align="stretch" spacing={2}>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            bg="gray.800"
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
          />
          <Button
            alignSelf="flex-end"
            colorScheme="blue"
            onClick={handleAddComment}
          >
            Post Comment
          </Button>
        </VStack>
      </VStack>

      <Divider borderColor="gray.600" />

      <VStack align="stretch" spacing={6}>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </VStack>
    </VStack>
  );
};

const GameDetails = () => {
  const { id } = useParams();
  const toast = useToast();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`https://api.sampleapis.com/switch/games`);
        const foundGame = response.data.find(g => g.id === parseInt(id));
        if (foundGame) {
          // Add additional game details
          setGame({
            ...foundGame,
            price: Math.floor(Math.random() * 40) + 20,
            discount: Math.random() < 0.3 ? Math.floor(Math.random() * 50) + 10 : 0,
            description: foundGame.description || 'An exciting game with amazing gameplay and stunning graphics.',
            releaseDate: '2023-12-25',
            developer: 'Game Studio',
            publisher: 'Game Publisher',
            genres: ['Action', 'Adventure', 'RPG'],
            rating: 4.5,
            reviews: 1250,
            features: [
              'Single-player',
              'Multi-player',
              'Online Co-op',
              'Controller Support'
            ],
            systemRequirements: {
              minimum: {
                os: 'Windows 10',
                processor: 'Intel Core i5',
                memory: '8 GB RAM',
                graphics: 'NVIDIA GTX 1060',
                storage: '50 GB'
              },
              recommended: {
                os: 'Windows 10',
                processor: 'Intel Core i7',
                memory: '16 GB RAM',
                graphics: 'NVIDIA RTX 2060',
                storage: '50 GB'
              }
            }
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleAddToCart = () => {
    toast({
      title: 'Added to Cart',
      description: `${game.name} has been added to your cart`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleToggleWishlist = () => {
    toast({
      title: game.inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      description: `${game.name} has been ${game.inWishlist ? 'removed from' : 'added to'} your wishlist`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Container maxW="container.xl" centerContent py={8}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (!game) {
    return (
      <Container maxW="container.xl" centerContent py={8}>
        <Heading>Game not found</Heading>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <Box>
            <Image
              src={game.image || 'https://via.placeholder.com/600x400?text=Game+Image'}
              alt={game.name}
              borderRadius="lg"
              width="100%"
              height="400px"
              objectFit="cover"
            />
          </Box>

          <VStack align="stretch" spacing={6}>
            <VStack align="stretch" spacing={2}>
              <Heading size="2xl">{game.name}</Heading>
              <HStack>
                <Icon as={FaStar} color="yellow.400" />
                <Text>{game.rating}/5</Text>
                <Text color="gray.500">({game.reviews} reviews)</Text>
              </HStack>
            </VStack>

            <HStack spacing={4}>
              {game.genres.map((genre, index) => (
                <Badge key={index} colorScheme="blue" fontSize="sm">
                  {genre}
                </Badge>
              ))}
            </HStack>

            <Text fontSize="lg" color="gray.600">
              {game.description}
            </Text>

            <VStack align="stretch" spacing={4} bg="gray.50" p={4} borderRadius="md">
              <HStack justify="space-between">
                {game.discount > 0 ? (
                  <HStack spacing={2}>
                    <Text textDecoration="line-through" color="gray.500">
                      ${game.price}
                    </Text>
                    <Text color="green.500" fontWeight="bold" fontSize="2xl">
                      ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                    </Text>
                    <Badge colorScheme="green" fontSize="lg">-{game.discount}%</Badge>
                  </HStack>
                ) : (
                  <Text fontWeight="bold" fontSize="2xl">${game.price}</Text>
                )}
              </HStack>

              <HStack spacing={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<Icon as={FaShoppingCart} />}
                  flex={1}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  colorScheme={game.inWishlist ? 'red' : 'gray'}
                  onClick={handleToggleWishlist}
                >
                  <Icon as={game.inWishlist ? FaHeart : FaBell} />
                </Button>
              </HStack>
            </VStack>

            <SimpleGrid columns={2} spacing={4}>
              <HStack>
                <Icon as={FaCalendar} />
                <Text>Release Date: {game.releaseDate}</Text>
              </HStack>
              <HStack>
                <Icon as={FaGamepad} />
                <Text>Developer: {game.developer}</Text>
              </HStack>
              <HStack>
                <Icon as={FaUsers} />
                <Text>Publisher: {game.publisher}</Text>
              </HStack>
              <HStack>
                <Icon as={FaDownload} />
                <Text>Size: {game.systemRequirements.minimum.storage}</Text>
              </HStack>
            </SimpleGrid>
          </VStack>
        </SimpleGrid>

        <Tabs variant="line" colorScheme="blue">
          <TabList borderBottomColor="gray.600">
            <Tab color="whiteAlpha.900" _selected={{ color: 'blue.400', borderColor: 'blue.400' }}>Overview</Tab>
            <Tab color="whiteAlpha.900" _selected={{ color: 'blue.400', borderColor: 'blue.400' }}>System Requirements</Tab>
            <Tab color="whiteAlpha.900" _selected={{ color: 'blue.400', borderColor: 'blue.400' }}>Comments</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing={6}>
                <Box>
                  <Heading size="md" mb={4} color="whiteAlpha.900">About This Game</Heading>
                  <Text color="whiteAlpha.800">{game.description}</Text>
                </Box>

                <Box>
                  <Heading size="md" mb={4} color="whiteAlpha.900">Features</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {game.features.map((feature, index) => (
                      <HStack key={index}>
                        <Icon as={FaGamepad} color="blue.400" />
                        <Text color="whiteAlpha.800">{feature}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <Box>
                  <Heading size="md" mb={4} color="whiteAlpha.900">Minimum Requirements</Heading>
                  <VStack align="stretch" spacing={3}>
                    {Object.entries(game.systemRequirements.minimum).map(([key, value]) => (
                      <HStack key={key} justify="space-between">
                        <Text color="whiteAlpha.600" textTransform="capitalize">{key}:</Text>
                        <Text color="whiteAlpha.900">{value}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Box>
                  <Heading size="md" mb={4} color="whiteAlpha.900">Recommended Requirements</Heading>
                  <VStack align="stretch" spacing={3}>
                    {Object.entries(game.systemRequirements.recommended).map(([key, value]) => (
                      <HStack key={key} justify="space-between">
                        <Text color="whiteAlpha.600" textTransform="capitalize">{key}:</Text>
                        <Text color="whiteAlpha.900">{value}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <CommentSection gameId={id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default GameDetails;
