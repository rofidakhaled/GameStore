import React from 'react';
import './StatusIndicator.css';

const StatusIndicator = ({ status }) => {
  return (
    <span className={`status-indicator ${status}`}></span>
  );
};

export default StatusIndicator;
