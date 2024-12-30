import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaBell, 
  FaHeart, 
  FaDownload, 
  FaUsers, 
  FaCalendar, 
  FaGamepad
} from 'react-icons/fa';
import { 
  Rating, 
  Modal, 
  CommentThread 
} from '../components/shared';
import '../styles/GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
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

  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        id: 'user1',
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40x40?text=JD',
        isVerified: true,
      },
      content: 'This game is absolutely amazing! The graphics and gameplay are top-notch.',
      timestamp: '2024-12-26T20:00:00',
      likes: 15,
      liked: false,
      replies: [
        {
          id: 2,
          user: {
            id: 'user2',
            name: 'Jane Smith',
            avatar: 'https://via.placeholder.com/40x40?text=JS',
            isVerified: false,
          },
          content: 'I agree! The story is particularly engaging.',
          timestamp: '2024-12-26T20:30:00',
          likes: 5,
          liked: false,
        }
      ]
    }
  ]);

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

  const handleRatingChange = (newRating) => {
    setGame(prev => ({ ...prev, rating: newRating }));
    // Here you would typically make an API call to update the rating
  };

  const handleCommentLike = (commentId) => {
    setComments(prevComments => {
      const updateComment = (comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            liked: !comment.liked
          };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => updateComment(reply))
          };
        }
        return comment;
      };
      
      return prevComments.map(comment => updateComment(comment));
    });
  };

  const handleCommentReply = (commentId) => {
    // Implement reply functionality
    console.log('Reply to comment:', commentId);
  };

  const handleCommentDelete = (commentId) => {
    setComments(prevComments => {
      const filterComments = (comments) => 
        comments.filter(comment => {
          if (comment.id === commentId) return false;
          if (comment.replies) {
            comment.replies = filterComments(comment.replies);
          }
          return true;
        });
      
      return filterComments(prevComments);
    });
  };

  return (
    <div className="game-details">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="game-header">
            <img src={game.image} alt={game.title} className="game-image" />
            <div className="game-info">
              <h1>{game.title}</h1>
              <div className="rating-section">
                <Rating 
                  value={game.rating} 
                  onChange={handleRatingChange} 
                  size="lg"
                  readOnly={false}
                />
                <span className="rating-value">{game.rating.toFixed(1)}</span>
              </div>
              <div className="price-section">
                {game.discount > 0 && (
                  <span className="discount">-{game.discount}%</span>
                )}
                <span className="price">
                  ${(game.price * (1 - game.discount / 100)).toFixed(2)}
                </span>
                {game.discount > 0 && (
                  <span className="original-price">${game.price.toFixed(2)}</span>
                )}
              </div>
              <div className="action-buttons">
                <button className="primary-button">
                  <FaShoppingCart /> Add to Cart
                </button>
                <button 
                  className={`wishlist-button ${game.inWishlist ? 'active' : ''}`}
                  onClick={toggleWishlist}
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>

          <div className="game-tabs">
            <button 
              className={`tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab ${activeTab === 'requirements' ? 'active' : ''}`}
              onClick={() => setShowRequirementsModal(true)}
            >
              Requirements
            </button>
            <button 
              className={`tab ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-tab">
                <p>{game.description}</p>
                <div className="game-details-grid">
                  <div className="detail-item">
                    <FaCalendar className="detail-icon" />
                    <div className="detail-content">
                      <h3>Release Date</h3>
                      <p>{game.releaseDate}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaGamepad className="detail-icon" />
                    <div className="detail-content">
                      <h3>Developer</h3>
                      <p>{game.developer}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaUsers className="detail-icon" />
                    <div className="detail-content">
                      <h3>Publisher</h3>
                      <p>{game.publisher}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="comments-section">
                {comments.map(comment => (
                  <CommentThread
                    key={comment.id}
                    comment={comment}
                    onReply={handleCommentReply}
                    onLike={handleCommentLike}
                    onDelete={handleCommentDelete}
                    currentUserId="user1"
                  />
                ))}
              </div>
            )}
          </div>

          <Modal
            isOpen={showRequirementsModal}
            onClose={() => setShowRequirementsModal(false)}
            title="System Requirements"
          >
            <div className="requirements-content">
              <div className="requirements-section">
                <h3>Minimum Requirements</h3>
                <ul>
                  <li><strong>OS:</strong> {game.requirements.minimum.os}</li>
                  <li><strong>Processor:</strong> {game.requirements.minimum.processor}</li>
                  <li><strong>Memory:</strong> {game.requirements.minimum.memory}</li>
                  <li><strong>Graphics:</strong> {game.requirements.minimum.graphics}</li>
                  <li><strong>Storage:</strong> {game.requirements.minimum.storage}</li>
                </ul>
              </div>
              <div className="requirements-section">
                <h3>Recommended Requirements</h3>
                <ul>
                  <li><strong>OS:</strong> {game.requirements.recommended.os}</li>
                  <li><strong>Processor:</strong> {game.requirements.recommended.processor}</li>
                  <li><strong>Memory:</strong> {game.requirements.recommended.memory}</li>
                  <li><strong>Graphics:</strong> {game.requirements.recommended.graphics}</li>
                  <li><strong>Storage:</strong> {game.requirements.recommended.storage}</li>
                </ul>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default GameDetails;
