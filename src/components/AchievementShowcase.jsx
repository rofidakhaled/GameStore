import React, { useState } from 'react';
import { FaTrophy, FaGift, FaClock } from 'react-icons/fa';
import ProgressBar from './ProgressBar';
import Badge from './Badge';
import SectionHeader from './SectionHeader';
import CategoryList from './CategoryList';
import './AchievementShowcase.css';

const AchievementShowcase = ({ achievements, totalAchievements, onViewAll }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const calculateCompletionRate = () => {
    const completed = achievements.filter(a => a.progress === 100).length;
    return Math.round((completed / totalAchievements) * 100);
  };

  return (
    <section className="achievement-showcase">
      <SectionHeader title="Achievements">
        <div className="achievement-stats">
          <FaTrophy className="trophy-icon" />
          <span>{totalAchievements} Total</span>
          <span className="completion-rate">
            {calculateCompletionRate()}% Complete
          </span>
        </div>
        <button className="view-all-btn" onClick={onViewAll}>
          View All 
        </button>
      </SectionHeader>

      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={`achievement-card ${achievement.progress === 100 ? 'completed' : ''}`}
          >
            <Badge
              name=""
              iconName={achievement.iconName}
              description={achievement.description}
            />
            <div className="achievement-content">
              <div className="achievement-header">
                <h3>{achievement.name}</h3>
                <span className="progress-text">
                  {achievement.progress}%
                </span>
              </div>
              <p className="achievement-description">{achievement.description}</p>
              {achievement.progress < 100 && (
                <ProgressBar progress={achievement.progress} />
              )}
              {achievement.reward && (
                <div className="achievement-reward">
                  <FaGift className="reward-icon" />
                  <span className="reward-text">{achievement.reward}</span>
                </div>
              )}
              {achievement.unlockedAt && (
                <div className="unlock-date">
                  <FaClock className="clock-icon" />
                  Unlocked {achievement.unlockedAt}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <CategoryList
        title="Categories"
        categories={['All', 'In Progress', 'Completed', 'Rare', 'Recent']}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
    </section>
  );
};

export default AchievementShowcase;
