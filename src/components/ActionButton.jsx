import React from 'react';
import './ActionButton.css';

const ActionButton = ({ 
  onClick, 
  icon: Icon, 
  children, 
  variant = 'default',
  className = '',
  title
}) => {
  return (
    <button 
      className={`action-btn ${variant} ${className}`}
      onClick={onClick}
      title={title}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default ActionButton;
