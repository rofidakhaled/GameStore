import React from 'react';
import { FaShoppingCart, FaBell, FaHeart, FaStar, FaDownload, FaUsers, FaCalendar, FaGamepad } from 'react-icons/fa';
import './GameHeader.css';

const GameHeader = ({ game, onToggleCart, onToggleWishlist }) => {
  return (
    <div className="game-header">
      <img src={game.image} alt={game.title} className="game-image" />
      <div className="game-info">
        <h1 className="game-title">{game.title}</h1>
        <div className="game-meta">
          <div className="meta-item">
            <FaGamepad className="meta-icon" />
            <span>{game.genre}</span>
          </div>
          <div className="meta-item">
            <FaCalendar className="meta-icon" />
            <span>{game.releaseDate}</span>
          </div>
          <div className="meta-item">
            <FaUsers className="meta-icon" />
            <span>{game.playerCount}</span>
          </div>
          <div className="meta-item">
            <FaStar className="meta-icon" />
            <span>{game.rating}</span>
          </div>
        </div>
        <div className="game-price">
          {game.discount > 0 && (
            <>
              <span className="original-price">${game.price}</span>
              <span className="discount-badge">-{game.discount}%</span>
            </>
          )}
          <span className="discounted-price">
            ${(game.price * (1 - game.discount / 100)).toFixed(2)}
          </span>
        </div>
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={onToggleCart}
          >
            <FaShoppingCart className="btn-icon" />
            {game.inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={onToggleWishlist}
          >
            <FaHeart 
              className={`btn-icon ${game.inWishlist ? 'active' : ''}`}
            />
            {game.inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
          <button className="btn btn-secondary">
            <FaBell className="btn-icon" />
            Set Alert
          </button>
          <button className="btn btn-secondary">
            <FaDownload className="btn-icon" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
