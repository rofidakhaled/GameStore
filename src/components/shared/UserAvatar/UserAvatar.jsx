import { FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './UserAvatar.css';

const UserAvatar = ({ 
  src, 
  alt, 
  size = 'md', 
  editable = false, 
  onEdit,
  className = '' 
}) => {
  return (
    <div className={`avatar-container size-${size} ${className}`}>
      <img 
        src={src || 'https://via.placeholder.com/150'} 
        alt={alt || 'User avatar'} 
        className="avatar-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      {editable && (
        <button 
          className="edit-avatar-btn"
          onClick={onEdit}
          aria-label="Edit avatar"
        >
          <FaEdit />
        </button>
      )}
    </div>
  );
};

UserAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  editable: PropTypes.bool,
  onEdit: PropTypes.func,
  className: PropTypes.string
};

export default UserAvatar;
