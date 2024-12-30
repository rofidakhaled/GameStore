import React from 'react';
import { FaThumbsUp, FaReply, FaEllipsisV } from 'react-icons/fa';
import './Comment.css';

const Comment = ({ comment, onReply, onLike, onDelete, currentUserId, isReply = false }) => {
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

  return (
    <div className={`comment ${isReply ? 'reply' : ''}`}>
      <div className="comment-header">
        <div className="comment-user">
          <img 
            src={comment.user.avatar} 
            alt={comment.user.name} 
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">
              {comment.user.name}
              {comment.user.isVerified && (
                <span className="verified-badge">✓</span>
              )}
            </span>
            <span className="comment-timestamp">
              {formatTimestamp(comment.timestamp)}
            </span>
          </div>
        </div>
        {comment.user.id === currentUserId && (
          <button 
            className="comment-menu"
            onClick={() => onDelete?.(comment.id)}
          >
            <FaEllipsisV />
          </button>
        )}
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-actions">
        <button 
          className={`action-button ${comment.liked ? 'liked' : ''}`}
          onClick={() => onLike?.(comment.id)}
        >
          <FaThumbsUp />
          <span>{comment.likes}</span>
        </button>
        {!isReply && (
          <button 
            className="action-button"
            onClick={() => onReply?.(comment.id)}
          >
            <FaReply />
            <span>Reply</span>
          </button>
        )}
      </div>
      {!isReply && comment.replies?.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              onLike={onLike}
              onDelete={onDelete}
              currentUserId={currentUserId}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
