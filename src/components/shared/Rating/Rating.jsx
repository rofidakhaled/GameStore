import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './Rating.css';

const Rating = ({ value = 0, onChange, size = 'md', readOnly = false }) => {
  const [hover, setHover] = useState(null);

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'rating-sm';
      case 'lg': return 'rating-lg';
      default: return 'rating-md';
    }
  };

  return (
    <div className={`rating ${getSizeClass()}`}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => !readOnly && onChange?.(ratingValue)}
            />
            <FaStar
              className={`star ${
                ratingValue <= (hover || value) ? 'active' : ''
              } ${readOnly ? 'readonly' : ''}`}
              onMouseEnter={() => !readOnly && setHover(ratingValue)}
              onMouseLeave={() => !readOnly && setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
