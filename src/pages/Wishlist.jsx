import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import '../styles/Wishlist.css';

const Wishlist = () => {
  const [wishlistGames, setWishlistGames] = useState([
    {
      id: 1,
      name: 'The Legend of Zelda: Breath of the Wild',
      price: 59.99,
      discount: 20,
      rating: 4.9,
      reviews: 2458,
      image: 'https://via.placeholder.com/300x200',
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Super Mario Odyssey',
      price: 49.99,
      discount: 0,
      rating: 4.8,
      reviews: 1897,
      image: 'https://via.placeholder.com/300x200',
      addedDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Animal Crossing: New Horizons',
      price: 54.99,
      discount: 15,
      rating: 4.7,
      reviews: 3254,
      image: 'https://via.placeholder.com/300x200',
      addedDate: '2024-01-05'
    }
  ]);

  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });

  const handleRemoveFromWishlist = (gameId) => {
    setWishlistGames(wishlistGames.filter(game => game.id !== gameId));
    showToastMessage('Game removed from wishlist');
  };

  const handleAddToCart = (gameId) => {
    // Add to cart logic here
    showToastMessage('Game added to cart', 'success');
  };

  const showToastMessage = (message, type = 'success') => {
    setShowToast({ show: true, message, type });
    setTimeout(() => setShowToast({ show: false, message: '', type: '' }), 3000);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>{wishlistGames.length} games</p>
      </div>

      <div className="wishlist-grid">
        {wishlistGames.map(game => (
          <div key={game.id} className="game-card">
            <div className="game-image-container">
              <img src={game.image} alt={game.name} className="game-image" />
              {game.discount > 0 && (
                <span className="discount-badge">-{game.discount}%</span>
              )}
            </div>

            <div className="game-details">
              <h3 className="game-title">{game.name}</h3>
              
              <div className="rating-container">
                <FaStar className="star-icon" />
                <span>{game.rating.toFixed(1)}</span>
                <span className="reviews-count">({game.reviews} reviews)</span>
              </div>

              <div className="price-container">
                <div className="price-tag">
                  {game.discount > 0 ? (
                    <>
                      <span className="original-price">${game.price}</span>
                      <span className="discounted-price">
                        ${calculateDiscountedPrice(game.price, game.discount)}
                      </span>
                    </>
                  ) : (
                    <span className="discounted-price">${game.price}</span>
                  )}
                </div>
                
                <div className="added-date">
                  Added {new Date(game.addedDate).toLocaleDateString()}
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFromWishlist(game.id)}
                >
                  <FaHeart /> Remove
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(game.id)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {wishlistGames.length === 0 && (
        <div className="empty-wishlist">
          <FaHeart className="empty-icon" />
          <h2>Your wishlist is empty</h2>
          <p>Browse the store to add games to your wishlist</p>
        </div>
      )}

      {showToast.show && (
        <div className={`toast ${showToast.type}`}>
          {showToast.message}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
