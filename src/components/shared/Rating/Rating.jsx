import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Rating.css';

const Rating = ({ value, onChange, readonly = false, size = 'md' }) => {
  return (
    <div className={`rating-stars size-${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`star ${star <= value ? 'active' : ''} ${readonly ? 'readonly' : ''}`}
          onClick={() => !readonly && onChange?.(star)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              !readonly && onChange?.(star);
            }
          }}
          tabIndex={readonly ? -1 : 0}
          role="button"
          aria-label={`Rate ${star} stars`}
        />
      ))}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default Rating;
