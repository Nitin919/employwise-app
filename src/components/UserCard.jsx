import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Eye, Edit2, Trash2 } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: { duration: 0.2 }
  }
};

export function UserCard({ user, onView, onEdit, onDelete }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1"
    >
      <div className="relative w-24 h-24">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
          </div>
        )}
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={imageError ? '/fallback-avatar.png' : user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageError(true)}
          className={`w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800">
        {user.first_name} {user.last_name}
      </h3>
      <p 
        className="text-sm text-gray-500 mt-1 truncate max-w-[200px]" 
        title={user.email}
      >
        {user.email}
      </p>
      <span className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-600 mt-2">
        ID: {user.id}
      </span>

      <div className="flex space-x-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onView(user)}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center space-x-1"
        >
          <Eye size={16} />
          <span>View</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(user)}
          className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition-colors flex items-center space-x-1"
        >
          <Edit2 size={16} />
          <span>Edit</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(user.id)}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors flex items-center space-x-1"
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserCard;