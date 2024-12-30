import React from 'react';
import './FilterButton.css';

const FilterButton = ({ label, active, onClick }) => {
  return (
    <button
      className={`filter-button ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FilterButton;
