import React from 'react';
import { FaStar, FaTools, FaCrown } from 'react-icons/fa';
import './Badge.css';

const Badge = ({ name, iconName, description }) => {
  const getIcon = (name) => {
    const icons = {
      star: <FaStar />,
      tools: <FaTools />,
      crown: <FaCrown />
    };
    return icons[name] || <FaStar />;
  };

  return (
    <div className="badge-item" title={description}>
      <span className="badge-icon">
        {getIcon(iconName)}
      </span>
      <span className="badge-name">{name}</span>
    </div>
  );
};

export default Badge;
