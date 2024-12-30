import PropTypes from 'prop-types';
import './ProgressBar.css';

const ProgressBar = ({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true,
  color = 'blue',
  size = 'md',
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={`progress-container ${className}`}>
      {label && (
        <div className="progress-header">
          <span className="progress-label">{label}</span>
          {showPercentage && (
            <span className="progress-percentage">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`progress-bar size-${size}`}>
        <div 
          className={`progress-fill color-${color}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
          aria-label={label}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  label: PropTypes.string,
  showPercentage: PropTypes.bool,
  color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow', 'purple']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default ProgressBar;
