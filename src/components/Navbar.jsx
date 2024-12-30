import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaStore,
  FaGamepad,
  FaUser,
  FaHeart,
  FaNewspaper,
  FaUsers,
  FaCog,
  FaShoppingCart,
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const links = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Store', path: '/store', icon: <FaStore /> },
    { name: 'Library', path: '/library', icon: <FaGamepad /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
    { name: 'Wishlist', path: '/wishlist', icon: <FaHeart /> },
    { name: 'News', path: '/news', icon: <FaNewspaper /> },
    { name: 'Friends', path: '/friends', icon: <FaUsers /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src="https://via.placeholder.com/40x40?text=GS" alt="GameStore" />
          </Link>
          <ul className="navbar-links">
            {links.map((link) => (
              <li key={link.path} className={isActive(link.path) ? 'active' : ''}>
                <Link to={link.path} className="navbar-link">
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-right">
          <Link to="/cart" className={`navbar-cart ${isActive('/cart') ? 'active' : ''}`}>
            <FaShoppingCart />
            <span>Cart</span>
            <span className="cart-badge">3</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
