import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Edit2, Trash2, ExternalLink } from 'lucide-react';
import PropTypes from 'prop-types';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

export const ProfileCard = ({ user, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div 
      variants={itemVariants}
      className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-6 mb-6 lg:mb-0"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={imageError ? '/fallback-avatar.png' : user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            onError={() => setImageError(true)}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4"
          />
          <span className="absolute bottom-6 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-gray-500 mt-1">{user.role}</p>
        <p className="text-sm text-gray-400">{user.department}</p>
        
        <div className="mt-4 flex flex-col items-center space-y-2">
          <motion.a
            whileHover={{ scale: 1.02 }}
            href={`mailto:${user.email}`}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <Mail size={16} className="mr-2" />
            <span className="text-sm group-hover:underline">{user.email}</span>
            <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100" />
          </motion.a>
          <div className="flex items-center text-gray-600">
            <Globe size={16} className="mr-2" />
            <span className="text-sm">{user.location}</span>
          </div>
        </div>

        <div className="w-full mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <motion.div whileHover={{ y: -2 }}>
              <div className="text-2xl font-bold text-blue-600">
                {user.stats?.projectsCompleted ?? 0}
              </div>
              <div className="text-xs text-gray-500">Projects</div>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <div className="text-2xl font-bold text-blue-600">
                {user.stats?.tasksThisWeek ?? 0}
              </div>
              <div className="text-xs text-gray-500">Tasks</div>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <div className="text-2xl font-bold text-blue-600">
                {user.stats?.upcomingDeadlines ?? 0}
              </div>
              <div className="text-xs text-gray-500">Deadlines</div>
            </motion.div>
          </div>
        </div>

        <div className="flex mt-6 space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
          >
            <Edit2 size={16} className="mr-2" />
            Edit Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    role: PropTypes.string,
    department: PropTypes.string,
    location: PropTypes.string,
    stats: PropTypes.shape({
      projectsCompleted: PropTypes.number,
      tasksThisWeek: PropTypes.number,
      upcomingDeadlines: PropTypes.number
    })
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ProfileCard;