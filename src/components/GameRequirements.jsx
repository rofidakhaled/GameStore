import React from 'react';
import './GameRequirements.css';

const GameRequirements = ({ requirements }) => {
  const renderRequirementsList = (specs) => (
    <ul className="requirements-list">
      <li>
        <span className="spec-label">OS:</span>
        <span className="spec-value">{specs.os}</span>
      </li>
      <li>
        <span className="spec-label">Processor:</span>
        <span className="spec-value">{specs.processor}</span>
      </li>
      <li>
        <span className="spec-label">Memory:</span>
        <span className="spec-value">{specs.memory}</span>
      </li>
      <li>
        <span className="spec-label">Graphics:</span>
        <span className="spec-value">{specs.graphics}</span>
      </li>
      <li>
        <span className="spec-label">Storage:</span>
        <span className="spec-value">{specs.storage}</span>
      </li>
    </ul>
  );

  return (
    <div className="game-requirements">
      <div className="requirements-section">
        <h3>Minimum Requirements</h3>
        {renderRequirementsList(requirements.minimum)}
      </div>
      <div className="requirements-section">
        <h3>Recommended Requirements</h3>
        {renderRequirementsList(requirements.recommended)}
      </div>
    </div>
  );
};

export default GameRequirements;
