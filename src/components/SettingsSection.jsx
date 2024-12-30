import React from 'react';
import './SettingsSection.css';

const SettingsSection = ({ title, description, children }) => {
  return (
    <section className="settings-section">
      <div className="section-header">
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export const FormGroup = ({ label, children, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {children}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export const ToggleGroup = ({ label, description, checked, onChange }) => {
  return (
    <div className="toggle-group">
      <div className="toggle-info">
        <label>{label}</label>
        {description && <p className="toggle-description">{description}</p>}
      </div>
      <label className="toggle">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );
};

export const VolumeControl = ({ icon: Icon, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="volume-control">
        <Icon className="volume-icon" />
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
        <span className="volume-value">{value}%</span>
      </div>
    </div>
  );
};

export default SettingsSection;
