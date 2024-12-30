import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaBell, 
  FaHeart, 
  FaDownload, 
  FaUsers, 
  FaCalendar, 
  FaGamepad,
  FaThumbsUp,
  FaReply,
  FaEllipsisV,
  FaStar
} from 'react-icons/fa';
import '../styles/GameDetails.css';
import Rating from '../components/shared/Rating/Rating';
import Modal from '../components/shared/Modal/Modal';
import Comment from '../components/shared/Comments/Comment';

const CommentSection = ({ gameId }) => {
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
    },
    {
      id: 3,
      user: {
        id: 'user3',
        name: 'Mike Wilson',
        avatar: 'https://via.placeholder.com/40x40?text=MW',
        isVerified: false,
      },
      content: 'The multiplayer mode is really fun with friends. Highly recommended!',
      timestamp: '2024-12-26T19:00:00',
      likes: 8,
      liked: false,
      replies: []
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: {
        id: 'currentUser',
        name: 'Current User',
        avatar: 'https://via.placeholder.com/40x40?text=CU',
        isVerified: true,
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleAddReply = (commentId) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: Date.now(),
      user: {
        id: 'currentUser',
        name: 'Current User',
        avatar: 'https://via.placeholder.com/40x40?text=CU',
        isVerified: true,
      },
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
    };

    setComments(comments.map(comment => 
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyingTo(null);
    setReplyContent('');
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? { ...reply, likes: reply.liked ? reply.likes - 1 : reply.likes + 1, liked: !reply.liked }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.liked ? comment.likes - 1 : comment.likes + 1, liked: !comment.liked }
          : comment
      ));
    }
  };

  const handleDelete = (commentId) => {
    setComments(prevComments => 
      prevComments.filter(comment => {
        if (comment.id === commentId) return false;
        if (comment.replies) {
          comment.replies = comment.replies.filter(reply => reply.id !== commentId);
        }
        return true;
      })
    );
  };

  return (
    <div className="comments-section">
      <div className="comment-input">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="comment-textarea"
        />
        <button 
          className="btn btn-primary"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
      <div className="comments-list">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={() => setReplyingTo(comment.id)}
            onLike={handleLike}
            onDelete={handleDelete}
            currentUserId="currentUser"
          />
        ))}
      </div>
    </div>
  );
};

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
                onClick={toggleCart}
              >
                <FaShoppingCart className="btn-icon" />
                {game.inCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={toggleWishlist}
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

        <div className="tabs">
          <div className="tab-list">
            <button 
              className={`tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab ${activeTab === 'requirements' ? 'active' : ''}`}
              onClick={() => setActiveTab('requirements')}
            >
              System Requirements
            </button>
            <button 
              className={`tab ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </div>

          <div className={`tab-panel ${activeTab === 'description' ? 'active' : ''}`}>
            <p>{game.description}</p>
            <h3>Features</h3>
            <ul>
              {game.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={`tab-panel ${activeTab === 'requirements' ? 'active' : ''}`}>
            <div className="requirements">
              <div className="minimum">
                <h3>Minimum Requirements</h3>
                <ul>
                  <li>OS: {game.requirements.minimum.os}</li>
                  <li>Processor: {game.requirements.minimum.processor}</li>
                  <li>Memory: {game.requirements.minimum.memory}</li>
                  <li>Graphics: {game.requirements.minimum.graphics}</li>
                  <li>Storage: {game.requirements.minimum.storage}</li>
                </ul>
              </div>
              <div className="recommended">
                <h3>Recommended Requirements</h3>
                <ul>
                  <li>OS: {game.requirements.recommended.os}</li>
                  <li>Processor: {game.requirements.recommended.processor}</li>
                  <li>Memory: {game.requirements.recommended.memory}</li>
                  <li>Graphics: {game.requirements.recommended.graphics}</li>
                  <li>Storage: {game.requirements.recommended.storage}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`tab-panel ${activeTab === 'comments' ? 'active' : ''}`}>
            <CommentSection gameId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
