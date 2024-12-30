import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Rating.css';

const Rating = ({ 
  value = 0, 
  max = 5, 
  size = 'md', 
  onChange, 
  readOnly = false,
  showValue = false 
}) => {
  const handleClick = (newValue) => {
    if (!readOnly && onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`rating-container size-${size}`}>
      {[...Array(max)].map((_, index) => (
        <FaStar
          key={index}
          className={`star ${index < value ? 'active' : ''} ${readOnly ? 'readonly' : ''}`}
          onClick={() => handleClick(index + 1)}
        />
      ))}
      {showValue && <span className="rating-value">{value.toFixed(1)}</span>}
    </div>
  );
};
