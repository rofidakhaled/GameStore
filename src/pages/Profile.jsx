import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';
import ProfileStats from '../components/ProfileStats';
import GameActivity from '../components/GameActivity';
import AchievementShowcase from '../components/AchievementShowcase';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: 'JohnDoe',
    level: 42,
    xp: 8750,
    status: 'Online',
    currentGame: 'Cyberpunk 2077',
    nextReward: 'Exclusive Avatar Frame',
    avatar: 'https://via.placeholder.com/150',
    coverImage: 'https://via.placeholder.com/1200x300',
    stats: {
      totalGames: 156,
      wishlistedGames: 24,
      friends: 89,
      achievements: 245,
      totalPlaytime: 1250
    },
    recentGames: [
      { 
        id: 1, 
        name: 'Cyberpunk 2077',
        image: 'https://via.placeholder.com/200x112?text=CP2077',
        lastPlayed: '2 hours ago',
        playtime: '120h',
        downloadProgress: 85,
        downloading: true,
        recentAchievements: [
          { id: 1, name: 'Night City Legend', description: 'Complete all main missions' }
        ]
      },
      { 
        id: 2,
        name: 'The Legend of Zelda',
        image: 'https://via.placeholder.com/200x112?text=TLOZ',
        lastPlayed: '5 hours ago',
        playtime: '85h',
        stats: true
      },
      { 
        id: 3,
        name: 'Animal Crossing',
        image: 'https://via.placeholder.com/200x112?text=AC',
        lastPlayed: 'Yesterday',
        playtime: '200h',
        stats: true,
        recentAchievements: [
          { id: 2, name: 'Island Paradise', description: 'Achieve 5-star island rating' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        name: 'Game Master',
        description: 'Complete 100 games',
        iconName: 'trophy',
        progress: 75,
        reward: '1000 XP'
      },
      {
        id: 2,
        name: 'Social Butterfly',
        description: 'Make 50 friends',
        iconName: 'medal',
        progress: 100,
        unlockedAt: '2 days ago',
        reward: 'Special Profile Frame'
      },
      {
        id: 3,
        name: 'Collector',
        description: 'Own 200 games',
        iconName: 'gamepad',
        progress: 60,
        reward: '500 XP'
      },
      {
        id: 4,
        name: 'Early Bird',
        description: 'Join the beta program',
        iconName: 'award',
        progress: 100,
        unlockedAt: '1 month ago',
        reward: 'Beta Tester Badge'
      }
    ],
    badges: [
      { id: 1, name: 'Early Adopter', icon: 'star', description: 'Joined during launch week' },
      { id: 2, name: 'Beta Tester', icon: 'tools', description: 'Participated in beta testing' },
      { id: 3, name: 'Premium Member', icon: 'crown', description: 'Premium subscription member' }
    ]
  });

  const handleEditProfile = () => {
    // Handle edit profile logic
  };

  const handleEditAvatar = () => {
    // Handle avatar edit logic
  };

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  const handlePlayGame = (gameId) => {
    // Handle game launch logic
  };

  const handleViewAllAchievements = () => {
    // Handle view all achievements logic
  };

  return (
    <div className="profile-container">
      <ProfileHeader 
        user={user}
        onEditProfile={handleEditProfile}
        onEditAvatar={handleEditAvatar}
        onOpenSettings={handleOpenSettings}
      />

      <ProfileStats stats={user.stats} />

      <div className="profile-content">
        <GameActivity 
          recentGames={user.recentGames}
          onPlayGame={handlePlayGame}
        />

        <AchievementShowcase 
          achievements={user.achievements}
          totalAchievements={user.stats.achievements}
          onViewAll={handleViewAllAchievements}
        />
      </div>
    </div>
  );
};

export default Profile;
