import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaBell, FaHeart, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { gameCoverImages, bannerImages } from '../assets/images';
import '../styles/Store.css';
import GameCard from '../components/GameCard';

const RatingModal = ({ isOpen, onClose, selectedGame, onSubmit }) => {
  const [rating, setRating] = useState(selectedGame?.rating || 0);
  const [review, setReview] = useState(selectedGame?.review || '');

  const handleSubmit = () => {
    onSubmit(rating, review);
    setRating(0);
    setReview('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Rate {selectedGame?.name}</h2>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              className={`star ${value <= rating ? 'active' : ''}`}
              onClick={() => setRating(value)}
            />
          ))}
        </div>
        <textarea
          className="review-textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
        />
        <button className="submit-button" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

const Store = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
=======
import {
  Box,
  Container,
  Text,
  Heading,
  Spinner,
  Image,
  Badge,
  VStack,
  HStack,
  Button,
  Input,
  useToast,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Store = () => {
  const toast = useToast();
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
  const [games, setGames] = useState([]);
  const [cartItems, setCartItems] = useState(new Set());
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gamesPerPage = 20;
=======
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
>>>>>>> ce14c46ac395c48b6549296538709488e2089431

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/switch/games');
<<<<<<< HEAD
        const gamesWithPricing = response.data.map(game => ({
          ...game,
          price: Math.floor(Math.random() * 40) + 20,
          discount: Math.random() < 0.3 ? Math.floor(Math.random() * 50) + 10 : 0,
          inWishlist: false,
          rating: Math.floor(Math.random() * 5) + 1,
          reviews: Math.floor(Math.random() * 1000) + 100,
          image: getRandomImage(game)
        }));
        setGames(gamesWithPricing);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        showToastMessage('Error loading games', 'error');
        setLoading(false);
=======
        const gamesWithDetails = response.data.map((game) => ({
          ...game,
          price: Math.floor(Math.random() * 40) + 20,
          discount: Math.random() < 0.3 ? Math.floor(Math.random() * 50) + 10 : 0,
          rating: Math.random() * 5,
          image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(game.name)}`,
        }));
        setGames(gamesWithDetails);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        toast({
          title: 'Error fetching games',
          description: 'Could not fetch game data. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
      }
    };

    fetchGames();
  }, [toast]);

<<<<<<< HEAD
  const getRandomImage = (game) => {
    const category = ['action', 'rpg', 'sports'][Math.floor(Math.random() * 3)];
    const images = gameCoverImages[category];
    return images[Math.floor(Math.random() * images.length)];
  };

  const showToastMessage = (message, type = 'success') => {
    setShowToast({ show: true, message, type });
    setTimeout(() => setShowToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleRateGame = (game, e) => {
    e.stopPropagation();
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleSubmitRating = (newRating, newReview) => {
    setGames(games.map(game => 
      game.id === selectedGame.id 
        ? { ...game, rating: newRating, userReview: newReview }
        : game
    ));
    setIsModalOpen(false);
    showToastMessage('Rating submitted successfully');
  };

  const handleToggleWishlist = (game, e) => {
    e.stopPropagation();
    setGames(games.map(g => 
      g.id === game.id 
        ? { ...g, inWishlist: !g.inWishlist }
        : g
    ));
    showToastMessage(game.inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleToggleCart = (game, e) => {
    e.stopPropagation();
    setCartItems(prev => {
      const newCart = new Set(prev);
      if (newCart.has(game.id)) {
        newCart.delete(game.id);
        showToastMessage('Removed from cart');
      } else {
        newCart.add(game.id);
        showToastMessage('Added to cart');
      }
      return newCart;
    });
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const paginatedGames = filteredGames.slice(startIndex, startIndex + gamesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading games...</p>
      </div>
=======
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
        <Text>Loading games...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Text color="red.500">Failed to load games. Please try again later.</Text>
      </Container>
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
    );
  }

  return (
<<<<<<< HEAD
    <div className="store-container">
      <div className="featured-banner">
        <img src={bannerImages.featured} alt="Featured Games" />
        <div className="banner-overlay">
          <h1 className="banner-title">Featured Games</h1>
          <p className="banner-subtitle">Discover the latest and greatest in gaming</p>
        </div>
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="games-grid">
        {paginatedGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onCartToggle={(game) => handleToggleCart(game, { stopPropagation: () => {} })}
            onWishlistToggle={(game) => handleToggleWishlist(game, { stopPropagation: () => {} })}
            onRate={(game) => handleRateGame(game, { stopPropagation: () => {} })}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
          <span>Previous</span>
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </div>

      {showToast.show && (
        <div className={`toast ${showToast.type}`}>
          {showToast.message}
        </div>
      )}

      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedGame={selectedGame}
        onSubmit={handleSubmitRating}
      />
    </div>
=======
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Game Store</Heading>
      <HStack mb={6} justifyContent="space-between">
        <Input
          placeholder="Search your store..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="gray.800"
          borderColor="gray.600"
          _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
        />
        <Button colorScheme="blue">Filter: All Games</Button>
      </HStack>
      <Divider mb={6} />
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={6}>
        {filteredGames.map((game) => (
          <Box
            key={game.id}
            bg="gray.800"
            p={4}
            borderRadius="lg"
            boxShadow="lg"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)' }}
          >
            <HStack spacing={4} alignItems="flex-start">
              <Image
                src={game.image}
                alt={game.name}
                borderRadius="md"
                w="120px"
                h="80px"
                objectFit="cover"
              />
              <VStack align="start" spacing={1} flex="1">
                <Text fontWeight="bold" fontSize="lg">
                  {game.name}
                </Text>
                <HStack>
                  {game.discount > 0 ? (
                    <HStack>
                      <Text color="gray.400" textDecoration="line-through">
                        ${game.price}
                      </Text>
                      <Text color="green.400" fontWeight="bold">
                        ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                      </Text>
                    </HStack>
                  ) : (
                    <Text color="whiteAlpha.900" fontWeight="bold">
                      ${game.price}
                    </Text>
                  )}
                  <Badge colorScheme="yellow">{game.rating.toFixed(1)} ★</Badge>
                </HStack>
                <HStack>
                  <Button size="sm" colorScheme="blue" leftIcon={<FaShoppingCart />}>
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<FaHeart />}
                  >
                    Wishlist
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
>>>>>>> ce14c46ac395c48b6549296538709488e2089431
  );
};

export default Store;
