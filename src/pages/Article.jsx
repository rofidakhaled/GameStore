import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendar, FaUser, FaTag, FaHeart, FaComment } from 'react-icons/fa';
import '../styles/Article.css';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({
    title: 'The Evolution of Gaming: From Pixels to Photorealism',
    author: 'Jane Smith',
    date: '2024-01-15',
    category: 'Gaming Technology',
    content: `
      <p>The gaming industry has come a long way since the days of simple pixel graphics. Today's games feature stunning photorealistic visuals that blur the line between reality and virtual worlds.</p>
      
      <h2>The Early Days</h2>
      <p>In the 1970s and 1980s, video games were limited to basic shapes and colors. Games like Pong and Space Invaders relied on simple pixel art to create their worlds.</p>
      
      <h2>The 3D Revolution</h2>
      <p>The 1990s saw the rise of 3D graphics, with games like Doom and Quake pushing the boundaries of what was possible. This era marked a significant turning point in gaming history.</p>
      
      <h2>Modern Gaming</h2>
      <p>Today's games utilize advanced technologies like ray tracing and photogrammetry to create incredibly realistic environments. Games like Red Dead Redemption 2 and Cyberpunk 2077 showcase the pinnacle of modern graphics technology.</p>
      
      <h2>The Future</h2>
      <p>As technology continues to advance, we can expect even more impressive visuals in the future. Real-time ray tracing, AI-enhanced graphics, and virtual reality are just the beginning.</p>
    `,
    likes: 245,
    comments: 58,
    relatedArticles: [
      {
        id: 2,
        title: 'The Rise of Indie Game Development',
        image: 'https://via.placeholder.com/200x150',
        date: '2024-01-10'
      },
      {
        id: 3,
        title: "Virtual Reality: Gaming's Next Frontier",
        image: 'https://via.placeholder.com/200x150',
        date: '2024-01-08'
      },
      {
        id: 4,
        title: 'The Impact of AI on Game Design',
        image: 'https://via.placeholder.com/200x150',
        date: '2024-01-05'
      }
    ]
  });

  const [liked, setLiked] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '' });

  const handleLike = () => {
    setLiked(!liked);
    setArticle(prev => ({
      ...prev,
      likes: prev.likes + (liked ? -1 : 1)
    }));
    showToastMessage(liked ? 'Removed like' : 'Added like');
  };

  const showToastMessage = (message) => {
    setShowToast({ show: true, message });
    setTimeout(() => setShowToast({ show: false, message: '' }), 3000);
  };

  return (
    <div className="article-container">
      <article className="article-content">
        <h1 className="article-title">{article.title}</h1>
        
        <div className="article-meta">
          <div className="meta-item">
            <FaUser className="meta-icon" />
            <span>{article.author}</span>
          </div>
          <div className="meta-item">
            <FaCalendar className="meta-icon" />
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>
          <div className="meta-item">
            <FaTag className="meta-icon" />
            <span>{article.category}</span>
          </div>
        </div>

        <div 
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="article-actions">
          <button 
            className={`like-button ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <FaHeart />
            <span>{article.likes} Likes</span>
          </button>
          
          <div className="comments-count">
            <FaComment />
            <span>{article.comments} Comments</span>
          </div>
        </div>
      </article>

      <aside className="related-articles">
        <h2>Related Articles</h2>
        <div className="related-list">
          {article.relatedArticles.map(related => (
            <div key={related.id} className="related-item">
              <img src={related.image} alt={related.title} />
              <div className="related-info">
                <h3>{related.title}</h3>
                <span className="related-date">
                  {new Date(related.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {showToast.show && (
        <div className="toast">
          {showToast.message}
        </div>
      )}
    </div>
  );
};

export default Article;
