// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    React.createElement('nav', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333', padding: '10px 20px', fontFamily: 'Arial, sans-serif' } },
      React.createElement('div', null,
        React.createElement(Link, { to: '/' },
          React.createElement('img', {
            src: 'https://via.placeholder.com/40x40?text=GS',
            alt: 'GameStore',
            style: { width: '40px', height: '40px', borderRadius: '5px' }
          })
        )
      ),
      React.createElement('ul', { style: { listStyle: 'none', display: 'flex', gap: '20px', padding: 0, margin: 0 } },
        [
          { path: '/', label: 'Home' },
          { path: '/store', label: 'Store' },
          { path: '/library', label: 'Library' },
          { path: '/profile', label: 'Profile' },
          { path: '/wishlist', label: 'Wishlist' },
          { path: '/news', label: 'News' },
          { path: '/friends', label: 'Friends' },
          { path: '/settings', label: 'Settings' },
        ].map(link => (
          React.createElement('li', { key: link.path },
            React.createElement(Link, {
              to: link.path,
              style: { textDecoration: 'none', color: '#fff', fontSize: '16px', transition: 'color 0.2s' },
              onMouseOver: (e) => (e.target.style.color = '#007BFF'),
              onMouseOut: (e) => (e.target.style.color = '#fff')
            }, link.label)
          )
        ))
      ),
      React.createElement('div', null,
        React.createElement(Link, {
          to: '/cart',
          style: { position: 'relative', textDecoration: 'none', color: '#fff', fontSize: '16px' }
        },
          'Cart',
          React.createElement('span', {
            style: {
              position: 'absolute',
              top: '-5px',
              right: '-10px',
              backgroundColor: '#FF4136',
              color: '#fff',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px'
            }
          }, '3')
        )
      )
    )
  );
};

export default Navbar;
