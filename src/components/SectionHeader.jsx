import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './SectionHeader.css';

const SectionHeader = ({ 
  title, 
  children, 
  onViewAll,
  viewAllText = 'View All'
}) => {
  return (
    <div className="section-header">
      <div className="header-main">
        <h2>{title}</h2>
        {children}
      </div>
      {onViewAll && (
        <button className="view-all-btn" onClick={onViewAll}>
          {viewAllText} <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
