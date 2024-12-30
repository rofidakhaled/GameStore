import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, height = '8px', className = '' }) => {
  return (
    <div 
      className={`progress-bar-container ${className}`}
      style={{ height }}
    >
      <div 
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
