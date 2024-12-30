import React from 'react';
import './CategoryList.css';

const CategoryList = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  title 
}) => {
  return (
    <div className="category-section">
      {title && <h3>{title}</h3>}
      <div className="category-list">
        {categories.map(category => (
          <button 
            key={category}
            className={`category-btn ${category === activeCategory ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
