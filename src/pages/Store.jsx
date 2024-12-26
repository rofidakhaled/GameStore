import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Input,
  Button,
  HStack,
  VStack,
  Icon,
  Badge,
  InputGroup,
  InputLeftElement,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Flex,
  ButtonGroup,
} from '@chakra-ui/react';
import { FaSearch, FaShoppingCart, FaBell, FaHeart, FaStar, FaEdit, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { gameCoverImages, bannerImages } from '../assets/images';

const RatingModal = ({ isOpen, onClose, selectedGame, onSubmit }) => {
  const [rating, setRating] = useState(selectedGame?.rating || 0);
  const [review, setReview] = useState(selectedGame?.review || '');

  const handleSubmit = () => {
    onSubmit(rating, review);
    setRating(0);
    setReview('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalHeader color="whiteAlpha.900">Rate {selectedGame?.name}</ModalHeader>
        <ModalCloseButton color="whiteAlpha.900" />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <HStack spacing={2}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  color={star <= rating ? "yellow.400" : "gray.400"}
                  onClick={() => setRating(star)}
                  p={0}
                >
                  <Icon as={FaStar} boxSize={6} />
                </Button>
              ))}
            </HStack>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              bg="gray.700"
              color="whiteAlpha.900"
              _placeholder={{ color: "gray.400" }}
              borderColor="gray.600"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "blue.300", boxShadow: "none" }}
            />
            <Button
              colorScheme="blue"
              width="100%"
              onClick={handleSubmit}
            >
              Submit Review
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Store = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/switch/games');
        const gamesWithPricing = response.data.map(game => {
          const category = ['action', 'rpg', 'sports'][Math.floor(Math.random() * 3)];
          const images = gameCoverImages[category];
          const randomImage = images[Math.floor(Math.random() * images.length)];
          
          return {
            ...game,
            price: Math.floor(Math.random() * 40) + 20,
            discount: Math.random() < 0.3 ? Math.floor(Math.random() * 50) + 10 : 0,
            inWishlist: false,
            rating: Math.floor(Math.random() * 5) + 1,
            reviews: Math.floor(Math.random() * 1000) + 100,
            image: randomImage
          };
        });
        setGames(gamesWithPricing);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleRateGame = (game) => {
    setSelectedGame(game);
    onOpen();
  };

  const handleSubmitRating = (newRating, newReview) => {
    setGames(games.map(game => 
      game.id === selectedGame.id 
        ? { ...game, rating: newRating, userReview: newReview }
        : game
    ));
    onClose();
    toast({
      title: 'Rating Submitted',
      description: 'Thank you for rating this game!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleToggleWishlist = (game) => {
    setGames(games.map(g => 
      g.id === game.id 
        ? { ...g, inWishlist: !g.inWishlist }
        : g
    ));
    
    toast({
      title: game.inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const paginatedGames = filteredGames.slice(startIndex, startIndex + gamesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack>
          <Spinner size="xl" />
          <Text>Loading games...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Featured Banner */}
        <Box
          position="relative"
          height="300px"
          borderRadius="xl"
          overflow="hidden"
          mb={8}
        >
          <Image
            src={bannerImages.featured}
            alt="Featured Games"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="rgba(0, 0, 0, 0.7)"
            p={6}
          >
            <Heading color="white" size="xl">
              Featured Games
            </Heading>
            <Text color="gray.300" mt={2}>
              Discover the latest and greatest in gaming
            </Text>
          </Box>
        </Box>

        {/* Search Bar */}
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.500" />
          </InputLeftElement>
          <Input
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            bg="gray.800"
            color="whiteAlpha.900"
            _placeholder={{ color: 'gray.400' }}
            borderColor="gray.600"
            _hover={{ borderColor: 'gray.500' }}
            _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
          />
        </InputGroup>

        {/* Games Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {paginatedGames.map((game) => (
            <Box
              key={game.id}
              bg="gray.800"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-4px)' }}
              cursor="pointer"
            >
              <Box position="relative">
                <Image
                  src={game.image}
                  alt={game.name}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />
                {game.discount > 0 && (
                  <Badge
                    position="absolute"
                    top={2}
                    right={2}
                    colorScheme="red"
                    fontSize="lg"
                    px={3}
                    py={1}
                  >
                    -{game.discount}%
                  </Badge>
                )}
              </Box>

              <Box p={4}>
                <Heading size="md" color="whiteAlpha.900" noOfLines={2}>
                  {game.name}
                </Heading>
                
                <HStack mt={2} spacing={2}>
                  <HStack>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text color="whiteAlpha.900">{game.rating.toFixed(1)}</Text>
                  </HStack>
                  <Text color="gray.400">({game.reviews} reviews)</Text>
                </HStack>

                <Flex justify="space-between" align="center" mt={4}>
                  <HStack spacing={2}>
                    {game.discount > 0 ? (
                      <>
                        <Text
                          color="gray.400"
                          textDecoration="line-through"
                          fontSize="sm"
                        >
                          ${game.price}
                        </Text>
                        <Text color="whiteAlpha.900" fontSize="xl" fontWeight="bold">
                          ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                        </Text>
                      </>
                    ) : (
                      <Text color="whiteAlpha.900" fontSize="xl" fontWeight="bold">
                        ${game.price}
                      </Text>
                    )}
                  </HStack>
                  
                  <HStack>
                    <Icon
                      as={FaHeart}
                      color={game.inWishlist ? 'red.500' : 'gray.600'}
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(game);
                      }}
                      _hover={{ color: 'red.500' }}
                    />
                    <Icon
                      as={FaEdit}
                      color="gray.600"
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRateGame(game);
                      }}
                      _hover={{ color: 'blue.500' }}
                    />
                  </HStack>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* Pagination */}
        {totalPages > 1 && (
          <HStack justify="center" spacing={4} mt={8}>
            <Button
              leftIcon={<FaChevronLeft />}
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              colorScheme="blue"
              variant="outline"
            >
              Previous
            </Button>
            
            <ButtonGroup spacing={2}>
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                // Show first page, last page, current page, and pages around current page
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                ) {
                  return (
                    <Button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      colorScheme={currentPage === pageNum ? 'blue' : 'gray'}
                      variant={currentPage === pageNum ? 'solid' : 'outline'}
                    >
                      {pageNum}
                    </Button>
                  );
                } else if (
                  pageNum === currentPage - 3 ||
                  pageNum === currentPage + 3
                ) {
                  return <Text key={pageNum}>...</Text>;
                }
                return null;
              })}
            </ButtonGroup>

            <Button
              rightIcon={<FaChevronRight />}
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              colorScheme="blue"
              variant="outline"
            >
              Next
            </Button>
          </HStack>
        )}
      </VStack>

      <RatingModal
        isOpen={isOpen}
        onClose={onClose}
        selectedGame={selectedGame}
        onSubmit={handleSubmitRating}
      />
    </Container>
  );
};

export default Store;
