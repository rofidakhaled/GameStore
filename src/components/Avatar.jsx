import React from 'react';
import './Avatar.css';

const Avatar = ({ src, alt, size = 'medium', showStatus, status }) => {
  return (
    <div className={`avatar-container ${size}`}>
      <img src={src} alt={alt} className="avatar-image" />
      {showStatus && <span className={`status-indicator ${status}`}></span>}
    </div>
  );
};

export default Avatar;
