import React from 'react';
import './GameTabs.css';

const GameTabs = ({ activeTab, onTabChange, children }) => {
  const tabs = React.Children.toArray(children).map(child => ({
    id: child.props.tabId,
    label: child.props.label
  }));

  return (
    <div className="game-tabs">
      <div className="tab-list">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panels">
        {React.Children.map(children, child => (
          <div className={`tab-panel ${activeTab === child.props.tabId ? 'active' : ''}`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export const TabPanel = ({ children }) => children;

export default GameTabs;
