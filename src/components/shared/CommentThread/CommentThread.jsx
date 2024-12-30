import { FaThumbsUp, FaReply, FaEllipsisV } from 'react-icons/fa';
import PropTypes from 'prop-types';
import UserAvatar from '../UserAvatar/UserAvatar';
import './CommentThread.css';

const CommentThread = ({ 
  comment, 
  onReply, 
  onLike,
  onDelete,
  currentUserId,
  depth = 0 
}) => {
  const isAuthor = currentUserId === comment.user.id;
  const maxDepth = 3;

  return (
    <div className={`comment-thread depth-${depth}`}>
      <div className="comment-main">
        <UserAvatar 
          src={comment.user.avatar} 
          alt={comment.user.name} 
          size="sm" 
        />
        <div className="comment-content">
          <div className="comment-header">
            <div className="user-info">
              <span className="user-name">{comment.user.name}</span>
              {comment.user.isVerified && (
                <span className="verified-badge" aria-label="Verified user" />
              )}
            </div>
            <span className="timestamp">{comment.timestamp}</span>
            {isAuthor && (
              <div className="comment-menu">
                <button 
                  className="menu-button"
                  onClick={() => onDelete(comment.id)}
                  aria-label="Delete comment"
                >
                  <FaEllipsisV />
                </button>
              </div>
            )}
          </div>
          <p className="comment-text">{comment.content}</p>
          <div className="comment-actions">
            <button 
              className={`action-button ${comment.liked ? 'liked' : ''}`}
              onClick={() => onLike(comment.id)}
            >
              <FaThumbsUp /> 
              <span>{comment.likes}</span>
            </button>
            {depth < maxDepth && (
              <button 
                className="action-button"
                onClick={() => onReply(comment.id)}
              >
                <FaReply /> 
                <span>Reply</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {comment.replies?.length > 0 && depth < maxDepth && (
        <div className="comment-replies">
          {comment.replies.map(reply => (
            <CommentThread 
              key={reply.id} 
              comment={reply} 
              onReply={onReply} 
              onLike={onLike}
              onDelete={onDelete}
              currentUserId={currentUserId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

CommentThread.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    user: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      isVerified: PropTypes.bool
    }).isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    liked: PropTypes.bool,
    replies: PropTypes.array
  }).isRequired,
  onReply: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  depth: PropTypes.number
};

export default CommentThread;
