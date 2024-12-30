import React, { useState } from 'react';
import { FaThumbsUp, FaReply, FaEllipsisV } from 'react-icons/fa';
import './Comment.css';

const Comment = ({ 
  comment, 
  onReply, 
  onLike, 
  onDelete,
  showActions = true,
  maxReplies = 2
}) => {
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const displayedReplies = showAllReplies 
    ? comment.replies 
    : comment.replies?.slice(0, maxReplies);

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="user-info">
          <img src={comment.user.avatar} alt={comment.user.name} className="user-avatar" />
          <div>
            <span className="user-name">
              {comment.user.name}
              {comment.user.isVerified && <span className="verified-badge">✓</span>}
            </span>
            <span className="comment-time">{new Date(comment.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
        {showActions && (
          <div className="comment-actions">
            <button onClick={() => onLike?.(comment.id)} className="action-button">
              <FaThumbsUp /> {comment.likes}
            </button>
            <button onClick={() => onReply?.(comment.id)} className="action-button">
              <FaReply />
            </button>
            <div className="menu-container">
              <button 
                onClick={() => setShowMenu(!showMenu)} 
                className="action-button"
              >
                <FaEllipsisV />
              </button>
              {showMenu && (
                <div className="menu-dropdown">
                  <button onClick={() => onDelete?.(comment.id)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <p className="comment-content">{comment.content}</p>
      {comment.replies?.length > 0 && (
        <div className="replies-section">
          {displayedReplies.map(reply => (
            <Comment 
              key={reply.id} 
              comment={reply} 
              showActions={showActions}
              maxReplies={0}
            />
          ))}
          {comment.replies.length > maxReplies && !showAllReplies && (
            <button 
              className="show-more-button"
              onClick={() => setShowAllReplies(true)}
            >
              Show more replies ({comment.replies.length - maxReplies})
            </button>
          )}
        </div>
      )}
    </div>
  );
};
