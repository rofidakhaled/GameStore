import React, { useState } from 'react';
import {
  FaUser,
  FaLock,
  FaBell,
  FaDownload,
  FaGamepad,
  FaPalette,
  FaGlobe,
  FaMicrophone,
  FaHeadphones,
  FaShieldAlt,
  FaDesktop,
  FaKeyboard
} from 'react-icons/fa';
import SettingsSection, { FormGroup, ToggleGroup, VolumeControl } from '../components/SettingsSection';
import '../styles/Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: {
      enabled: true,
      gameUpdates: true,
      friendRequests: true,
      achievements: true,
      sales: true
    },
    downloads: {
      location: 'C:/Games',
      autoUpdate: true,
      backgroundDownloads: true,
      throttleDownloads: false
    },
    appearance: {
      theme: 'dark',
      accentColor: '#7C3AED',
      fontSize: 'medium',
      animations: true
    },
    language: 'en',
    audio: {
      master: 100,
      music: 80,
      sfx: 70,
      voice: 90,
      mic: 80,
      inputDevice: 'Default Microphone',
      outputDevice: 'Default Speakers'
    },
    gameplay: {
      showFps: true,
      vsync: true,
      autoDetectSettings: true,
      streamingMode: false
    },
    privacy: {
      profileVisibility: 'friends',
      activityStatus: 'online',
      showPlaytime: true,
      allowFriendRequests: true
    }
  });

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: FaUser },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'privacy', label: 'Privacy', icon: FaShieldAlt },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'downloads', label: 'Downloads', icon: FaDownload },
    { id: 'gameplay', label: 'Gameplay', icon: FaGamepad },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'language', label: 'Language', icon: FaGlobe },
    { id: 'audio', label: 'Audio', icon: FaHeadphones },
    { id: 'devices', label: 'Devices', icon: FaDesktop },
    { id: 'keybinds', label: 'Keybinds', icon: FaKeyboard },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
  ];

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  return (
    <div className="settings-container">
      <aside className="settings-sidebar">
        <nav className="settings-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <section.icon className="nav-icon" />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="settings-main">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        {activeSection === 'profile' && (
          <SettingsSection 
            title="Profile Settings" 
            description="Manage how your profile appears to others"
          >
            <FormGroup label="Display Name">
              <input type="text" defaultValue="GameMaster123" />
            </FormGroup>
            <FormGroup label="Email">
              <input type="email" defaultValue="user@example.com" />
            </FormGroup>
            <FormGroup label="Bio">
              <textarea defaultValue="Passionate gamer since 2010" />
            </FormGroup>
          </SettingsSection>
        )}

        {activeSection === 'notifications' && (
          <SettingsSection 
            title="Notification Preferences" 
            description="Choose what notifications you want to receive"
          >
            <ToggleGroup
              label="Enable Notifications"
              description="Master toggle for all notifications"
              checked={settings.notifications.enabled}
              onChange={(value) => handleSettingChange('notifications', 'enabled', value)}
            />
            <ToggleGroup
              label="Game Updates"
              description="Get notified about game updates and patches"
              checked={settings.notifications.gameUpdates}
              onChange={(value) => handleSettingChange('notifications', 'gameUpdates', value)}
            />
            <ToggleGroup
              label="Friend Requests"
              description="Get notified when someone sends you a friend request"
              checked={settings.notifications.friendRequests}
              onChange={(value) => handleSettingChange('notifications', 'friendRequests', value)}
            />
            <ToggleGroup
              label="Achievements"
              description="Get notified when you earn achievements"
              checked={settings.notifications.achievements}
              onChange={(value) => handleSettingChange('notifications', 'achievements', value)}
            />
          </SettingsSection>
        )}

        {activeSection === 'downloads' && (
          <SettingsSection 
            title="Download Settings" 
            description="Manage your game downloads and updates"
          >
            <FormGroup label="Download Location">
              <div className="input-with-button">
                <input type="text" value={settings.downloads.location} readOnly />
                <button className="secondary-button">Browse</button>
              </div>
            </FormGroup>
            <ToggleGroup
              label="Auto-Update Games"
              description="Automatically download and install game updates"
              checked={settings.downloads.autoUpdate}
              onChange={(value) => handleSettingChange('downloads', 'autoUpdate', value)}
            />
            <ToggleGroup
              label="Background Downloads"
              description="Continue downloading while playing games"
              checked={settings.downloads.backgroundDownloads}
              onChange={(value) => handleSettingChange('downloads', 'backgroundDownloads', value)}
            />
          </SettingsSection>
        )}

        {activeSection === 'appearance' && (
          <SettingsSection 
            title="Appearance Settings" 
            description="Customize how the application looks"
          >
            <FormGroup label="Theme">
              <select 
                value={settings.appearance.theme}
                onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
              >
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
                <option value="system">System Default</option>
              </select>
            </FormGroup>
            <FormGroup label="Font Size">
              <select 
                value={settings.appearance.fontSize}
                onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </FormGroup>
            <ToggleGroup
              label="Enable Animations"
              description="Show animations throughout the interface"
              checked={settings.appearance.animations}
              onChange={(value) => handleSettingChange('appearance', 'animations', value)}
            />
          </SettingsSection>
        )}

        {activeSection === 'language' && (
          <SettingsSection 
            title="Language Settings" 
            description="Choose your preferred language"
          >
            <FormGroup label="Display Language">
              <select 
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </FormGroup>
          </SettingsSection>
        )}

        {activeSection === 'audio' && (
          <SettingsSection 
            title="Audio Settings" 
            description="Configure your audio preferences"
          >
            <VolumeControl
              icon={FaHeadphones}
              label="Master Volume"
              value={settings.audio.master}
              onChange={(value) => handleSettingChange('audio', 'master', value)}
            />
            <VolumeControl
              icon={FaGamepad}
              label="Game Sound Effects"
              value={settings.audio.sfx}
              onChange={(value) => handleSettingChange('audio', 'sfx', value)}
            />
            <VolumeControl
              icon={FaMicrophone}
              label="Microphone Volume"
              value={settings.audio.mic}
              onChange={(value) => handleSettingChange('audio', 'mic', value)}
            />
            <FormGroup label="Input Device">
              <select 
                value={settings.audio.inputDevice}
                onChange={(e) => handleSettingChange('audio', 'inputDevice', e.target.value)}
              >
                <option value="Default Microphone">Default Microphone</option>
                <option value="Headset Microphone">Headset Microphone</option>
              </select>
            </FormGroup>
            <FormGroup label="Output Device">
              <select 
                value={settings.audio.outputDevice}
                onChange={(e) => handleSettingChange('audio', 'outputDevice', e.target.value)}
              >
                <option value="Default Speakers">Default Speakers</option>
                <option value="Headphones">Headphones</option>
              </select>
            </FormGroup>
          </SettingsSection>
        )}

        {activeSection === 'gameplay' && (
          <SettingsSection 
            title="Gameplay Settings" 
            description="Configure your gaming experience"
          >
            <ToggleGroup
              label="Show FPS Counter"
              description="Display frames per second while gaming"
              checked={settings.gameplay.showFps}
              onChange={(value) => handleSettingChange('gameplay', 'showFps', value)}
            />
            <ToggleGroup
              label="V-Sync"
              description="Synchronize game frame rate with monitor refresh rate"
              checked={settings.gameplay.vsync}
              onChange={(value) => handleSettingChange('gameplay', 'vsync', value)}
            />
            <ToggleGroup
              label="Auto-Detect Settings"
              description="Automatically optimize game settings based on your hardware"
              checked={settings.gameplay.autoDetectSettings}
              onChange={(value) => handleSettingChange('gameplay', 'autoDetectSettings', value)}
            />
            <ToggleGroup
              label="Streaming Mode"
              description="Optimize performance for streaming"
              checked={settings.gameplay.streamingMode}
              onChange={(value) => handleSettingChange('gameplay', 'streamingMode', value)}
            />
          </SettingsSection>
        )}

        {activeSection === 'privacy' && (
          <SettingsSection 
            title="Privacy Settings" 
            description="Control who can see your activity and interact with you"
          >
            <FormGroup label="Profile Visibility">
              <select 
                value={settings.privacy.profileVisibility}
                onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </FormGroup>
            <FormGroup label="Activity Status">
              <select 
                value={settings.privacy.activityStatus}
                onChange={(e) => handleSettingChange('privacy', 'activityStatus', e.target.value)}
              >
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="invisible">Invisible</option>
              </select>
            </FormGroup>
            <ToggleGroup
              label="Show Playtime"
              description="Allow others to see your game playtime"
              checked={settings.privacy.showPlaytime}
              onChange={(value) => handleSettingChange('privacy', 'showPlaytime', value)}
            />
            <ToggleGroup
              label="Allow Friend Requests"
              description="Let other users send you friend requests"
              checked={settings.privacy.allowFriendRequests}
              onChange={(value) => handleSettingChange('privacy', 'allowFriendRequests', value)}
            />
          </SettingsSection>
        )}
      </main>
    </div>
  );
};

export default Settings;
