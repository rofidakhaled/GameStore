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
} from 'react-icons/fa';
import '../styles/Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [downloadLocation, setDownloadLocation] = useState('C:/Games');
  const [micVolume, setMicVolume] = useState(80);
  const [speakerVolume, setSpeakerVolume] = useState(65);

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: FaUser },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'downloads', label: 'Downloads', icon: FaDownload },
    { id: 'gameplay', label: 'Gameplay', icon: FaGamepad },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'language', label: 'Language', icon: FaGlobe },
    { id: 'audio', label: 'Audio', icon: FaHeadphones },
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
          <section className="settings-section">
            <h2>Profile Settings</h2>
            <div className="settings-content">
              <div className="form-group">
                <label>Display Name</label>
                <input type="text" defaultValue="GameMaster123" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue="user@example.com" />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea defaultValue="Passionate gamer since 2010" />
              </div>
            </div>
          </section>
        )}

        {activeSection === 'notifications' && (
          <section className="settings-section">
            <h2>Notification Preferences</h2>
            <div className="settings-content">
              <div className="toggle-group">
                <label>Enable Notifications</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="toggle-group">
                <label>Game Updates</label>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="toggle-group">
                <label>Friend Requests</label>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'downloads' && (
          <section className="settings-section">
            <h2>Download Settings</h2>
            <div className="settings-content">
              <div className="form-group">
                <label>Download Location</label>
                <div className="input-with-button">
                  <input type="text" value={downloadLocation} readOnly />
                  <button className="secondary-button">Browse</button>
                </div>
              </div>
              <div className="toggle-group">
                <label>Auto-Update Games</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={autoUpdate}
                    onChange={(e) => setAutoUpdate(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'appearance' && (
          <section className="settings-section">
            <h2>Appearance Settings</h2>
            <div className="settings-content">
              <div className="form-group">
                <label>Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option value="dark">Dark Theme</option>
                  <option value="light">Light Theme</option>
                  <option value="system">System Default</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'language' && (
          <section className="settings-section">
            <h2>Language Settings</h2>
            <div className="settings-content">
              <div className="form-group">
                <label>Display Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'audio' && (
          <section className="settings-section">
            <h2>Audio Settings</h2>
            <div className="settings-content">
              <div className="form-group">
                <label>Microphone Volume</label>
                <div className="volume-control">
                  <FaMicrophone className="volume-icon" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={micVolume}
                    onChange={(e) => setMicVolume(parseInt(e.target.value))}
                  />
                  <span className="volume-value">{micVolume}%</span>
                </div>
              </div>
              <div className="form-group">
                <label>Speaker Volume</label>
                <div className="volume-control">
                  <FaHeadphones className="volume-icon" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={speakerVolume}
                    onChange={(e) => setSpeakerVolume(parseInt(e.target.value))}
                  />
                  <span className="volume-value">{speakerVolume}%</span>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="settings-actions">
          <button className="primary-button">Save Changes</button>
          <button className="secondary-button">Reset to Default</button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
