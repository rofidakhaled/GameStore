import React from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaPlay, FaDownload, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({
  game,
  onCartToggle,
  onWishlistToggle,
  onRate,
  showActions = true,
  additionalInfo,
  className = '',
  variant = 'store' // 'store' or 'library'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (game.id && variant === 'store') {
      navigate(`/game/${game.id}`);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  const renderLibraryContent = () => {
    return (
      <>
        <div className="game-actions">
          {game.installed ? (
            <button className="action-button primary">
              <FaPlay />
              <span>Play</span>
            </button>
          ) : (
            <button className="action-button">
              <FaDownload />
              <span>Install</span>
            </button>
          )}
        </div>
        
        <div className="game-meta">
          <div className="meta-item">
            <FaClock className="meta-icon" />
            <span>{game.playtime} hours played</span>
          </div>
          {game.achievements && (
            <div className="meta-item">
              <FaStar className="meta-icon" />
              <span>
                {game.achievements}/{game.totalAchievements} achievements
              </span>
            </div>
          )}
        </div>

        <div className="game-status">
          <span className={`status-badge ${game.installed ? 'installed' : 'not-installed'}`}>
            {game.status}
          </span>
          {game.lastPlayed && (
            <span className="last-played">Last played: {game.lastPlayed}</span>
          )}
        </div>
      </>
    );
  };

  const renderStoreContent = () => {
    return (
      <>
        <div className="rating-container">
          <div className="rating-stars">
            <FaStar className="star-icon" />
            <span>{game.rating?.toFixed(1)}</span>
            <span className="reviews-count">({game.reviews} reviews)</span>
          </div>
        </div>

        <div className="game-card-footer">
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

          {showActions && (
            <div className="action-buttons">
              {onCartToggle && (
                <FaShoppingCart
                  className={`action-icon cart ${game.inCart ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCartToggle(game);
                  }}
                />
              )}
              {onWishlistToggle && (
                <FaHeart
                  className={`action-icon wishlist ${game.inWishlist ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onWishlistToggle(game);
                  }}
                />
              )}
              {onRate && (
                <FaStar
                  className="action-icon rate"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRate(game);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div 
      className={`game-card ${variant} ${className}`}
      onClick={handleClick}
    >
      <div className="game-image-container">
        <img 
          className="game-image" 
          src={game.image} 
          alt={game.name || game.title} 
        />
        {variant === 'store' && game.discount > 0 && (
          <span className="discount-badge">-{game.discount}%</span>
        )}
      </div>

      <div className="game-details">
        <h3 className="game-title">{game.name || game.title}</h3>
        
        {variant === 'store' ? renderStoreContent() : renderLibraryContent()}

        {additionalInfo && (
          <div className="additional-info">
            {additionalInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
