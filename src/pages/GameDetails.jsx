import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameHeader from '../components/GameHeader';
import GameTabs, { TabPanel } from '../components/GameTabs';
import GameRequirements from '../components/GameRequirements';
import CommentSection from '../components/CommentSection';
import '../styles/GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [game, setGame] = useState({
    id: 1,
    title: 'Cyberpunk 2077',
    image: 'https://via.placeholder.com/600x400',
    description: 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.',
    price: 59.99,
    discount: 20,
    rating: 4.5,
    releaseDate: '2020-12-10',
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    genre: 'Action RPG',
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    features: ['Single-player', 'Ray Tracing', 'HDR'],
    requirements: {
      minimum: {
        os: 'Windows 10',
        processor: 'Intel Core i5-3570K',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 970',
        storage: '70 GB'
      },
      recommended: {
        os: 'Windows 10',
        processor: 'Intel Core i7-4790',
        memory: '12 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1060',
        storage: '70 GB'
      }
    },
    playerCount: '1 player',
    inWishlist: false,
    inCart: false
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulating API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  const toggleWishlist = () => {
    setGame(prev => ({ ...prev, inWishlist: !prev.inWishlist }));
  };

  const toggleCart = () => {
    setGame(prev => ({ ...prev, inCart: !prev.inCart }));
  };

  if (loading) {
    return (
      <div className="loading">Loading...</div>
    );
  }

  return (
    <div className="game-details">
      <div className="game-container">
        <GameHeader
          game={game}
          onToggleCart={toggleCart}
          onToggleWishlist={toggleWishlist}
        />

        <GameTabs activeTab={activeTab} onTabChange={setActiveTab}>
          <TabPanel tabId="description" label="Description">
            <div className="game-description">
              <p>{game.description}</p>
              <h3>Features</h3>
              <ul className="features-list">
                {game.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="game-info-grid">
                <div className="info-item">
                  <h4>Developer</h4>
                  <p>{game.developer}</p>
                </div>
                <div className="info-item">
                  <h4>Publisher</h4>
                  <p>{game.publisher}</p>
                </div>
                <div className="info-item">
                  <h4>Platforms</h4>
                  <p>{game.platforms.join(', ')}</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel tabId="requirements" label="System Requirements">
            <GameRequirements requirements={game.requirements} />
          </TabPanel>

          <TabPanel tabId="comments" label="Comments">
            <CommentSection gameId={game.id} />
          </TabPanel>
        </GameTabs>
      </div>
    </div>
  );
};

export default GameDetails;
