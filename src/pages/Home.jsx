import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaGamepad, FaStar, FaTag, FaShoppingCart, FaHeart } from 'react-icons/fa';
import GameCard from '../components/GameCard';
import '../styles/Home.css';

const Home = () => {
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'Cyberpunk 2077',
      image: 'https://via.placeholder.com/300x400',
      price: 59.99,
      discount: 20,
      rating: 4.5,
      reviews: 1250,
      inWishlist: false,
      inCart: false
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2',
      image: 'https://via.placeholder.com/300x400',
      price: 49.99,
      rating: 4.8,
      reviews: 2340,
      inWishlist: false,
      inCart: false
    },
    {
      id: 3,
      title: 'Elden Ring',
      image: 'https://via.placeholder.com/300x400',
      price: 59.99,
      rating: 4.9,
      reviews: 3120,
      discount: 15,
      inWishlist: false,
      inCart: false
    },
  ]);

  const categories = [
    { id: 1, name: 'Action', icon: FaGamepad, count: 156 },
    { id: 2, name: 'Adventure', icon: FaFire, count: 94 },
    { id: 3, name: 'RPG', icon: FaStar, count: 78 },
    { id: 4, name: 'Strategy', icon: FaTag, count: 45 },
  ];

  const toggleWishlist = (gameId) => {
    setGames(games.map(game => 
      game.id === gameId 
        ? { ...game, inWishlist: !game.inWishlist }
        : game
    ));
  };

  const toggleCart = (gameId) => {
    setGames(games.map(game => 
      game.id === gameId 
        ? { ...game, inCart: !game.inCart }
        : game
    ));
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to GameStore</h1>
          <p>Discover the best games at the best prices</p>
          <Link to="/store" className="btn-primary">
            Browse Games
          </Link>
        </div>
      </section>

      {/* Featured Games */}
      <section className="featured-section">
        <h2>Featured Games</h2>
        <div className="featured-games">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onCartToggle={(game) => toggleCart(game.id)}
              onWishlistToggle={(game) => toggleWishlist(game.id)}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <h2>Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <category.icon className="category-icon" />
              <h3>{category.name}</h3>
              <span className="game-count">{category.count} Games</span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest games and exclusive offers</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
