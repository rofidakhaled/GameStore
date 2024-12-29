import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaBell, FaHeart, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { gameCoverImages, bannerImages } from '../assets/images';
import '../styles/Store.css';

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
  const [games, setGames] = useState([]);
  const [cartItems, setCartItems] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gamesPerPage = 20;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/switch/games');
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
      }
    };

    fetchGames();
  }, []);

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
    );
  }

  return (
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
          <div
            key={game.id}
            className="game-card"
            onClick={() => navigate(`/game/${game.id}`)}
          >
            <div className="game-image-container">
              <img className="game-image" src={game.image} alt={game.name} />
              {game.discount > 0 && (
                <span className="discount-badge">-{game.discount}%</span>
              )}
            </div>

            <div className="store-game-details">
              <h3 className="game-title">{game.name}</h3>
              
              <div className="rating-container">
                <div className="rating-stars">
                  <FaStar className="star-icon" />
                  <span>{game.rating.toFixed(1)}</span>
                  <span className="reviews-count">({game.reviews} reviews)</span>
                </div>
              </div>

              <div className="game-card-footer">
                <div className="price-tag">
                  {game.discount > 0 ? (
                    <>
                      <span className="original-price">${game.price}</span>
                      <span className="discounted-price">
                        ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="discounted-price">${game.price}</span>
                  )}
                </div>

                <div className="action-buttons">
                  <FaShoppingCart
                    className={`action-icon cart ${cartItems.has(game.id) ? 'active' : ''}`}
                    onClick={(e) => handleToggleCart(game, e)}
                  />
                  <FaHeart
                    className={`action-icon wishlist ${game.inWishlist ? 'active' : ''}`}
                    onClick={(e) => handleToggleWishlist(game, e)}
                  />
                  <FaStar
                    className="action-icon rate"
                    onClick={(e) => handleRateGame(game, e)}
                  />
                </div>
              </div>
            </div>
          </div>
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
  );
};

export default Store;
