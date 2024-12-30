import React, { useState } from 'react';
import { FaThumbsUp, FaReply } from 'react-icons/fa';
import './CommentSection.css';

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

export default CommentSection;
