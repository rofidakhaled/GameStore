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
} from 'react-icons/fa';
import '../styles/GameDetails.css';
import Rating from '../components/Rating/Rating';
import Comment from '../components/Comments/Comment';

const CommentSection = ({ gameId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40x40?text=JD',
        isVerified: true,
      },
      content: 'This game is absolutely amazing! The graphics and gameplay are top-notch.',
      timestamp: '2024-12-26T20:00:00',
      likes: 15,
      replies: [
        {
          id: 2,
          user: {
            name: 'Jane Smith',
            avatar: 'https://via.placeholder.com/40x40?text=JS',
            isVerified: false,
          },
          content: 'I agree! The story is particularly engaging.',
          timestamp: '2024-12-26T20:30:00',
          likes: 5,
        }
      ]
    },
    {
      id: 3,
      user: {
        name: 'Mike Wilson',
        avatar: 'https://via.placeholder.com/40x40?text=MW',
        isVerified: false,
      },
      content: 'The multiplayer mode is really fun with friends. Highly recommended!',
      timestamp: '2024-12-26T19:00:00',
      likes: 8,
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
        name: 'Current User',
        avatar: 'https://via.placeholder.com/40x40?text=CU',
        isVerified: true,
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
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
        name: 'Current User',
        avatar: 'https://via.placeholder.com/40x40?text=CU',
        isVerified: true,
      },
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
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
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const Comment = ({ comment, isReply = false, parentId = null }) => (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-user">
          <img 
            src={comment.user.avatar} 
            alt={comment.user.name} 
            className="user-avatar"
          />
          <div>
            <span className="user-name">{comment.user.name}</span>
            {comment.user.isVerified && (
              <span className="verified-badge">Verified</span>
            )}
          </div>
          <span className="comment-timestamp">
            {formatTimestamp(comment.timestamp)}
          </span>
        </div>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-actions">
        <button 
          className="action-button"
          onClick={() => handleLike(comment.id, isReply, parentId)}
        >
          <FaThumbsUp /> {comment.likes}
        </button>
        {!isReply && (
          <button 
            className="action-button"
            onClick={() => setReplyingTo(comment.id)}
          >
            <FaReply /> Reply
          </button>
        )}
      </div>
      {replyingTo === comment.id && (
        <div className="reply-input">
          <textarea
            className="comment-textarea"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
          />
          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => handleAddReply(comment.id)}
            >
              Reply
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setReplyingTo(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {!isReply && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <Comment 
              key={reply.id} 
              comment={reply} 
              isReply={true} 
              parentId={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="comments-section">
      <div className="comment-input">
        <textarea
          className="comment-textarea"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
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
          <Comment key={comment.id} comment={comment} />
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
