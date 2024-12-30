import React from 'react';
import ProgressBar from './ProgressBar';
import './LevelInfo.css';

const LevelInfo = ({ level, currentXp, nextLevelXp, nextReward }) => {
  const progress = (currentXp / nextLevelXp) * 100;

  return (
    <div className="level-info">
      <div className="level-header">
        <span className="level">Level {level}</span>
        <span className="xp-text">
          {currentXp} / {nextLevelXp} XP
        </span>
      </div>
      <ProgressBar progress={progress} />
      {nextReward && (
        <div className="level-rewards">
          Next Reward: <span className="next-reward">{nextReward}</span>
        </div>
      )}
    </div>
  );
};

export default LevelInfo;
