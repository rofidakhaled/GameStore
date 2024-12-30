import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchInput.css';

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-container">
      <div className="search-input">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder={placeholder || "Search..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
