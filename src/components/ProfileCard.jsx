import { motion } from 'framer-motion';
import { Mail, Globe, Edit2, Trash2 } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

export const ProfileCard = ({ user, onEdit, onDelete }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-6 mb-6 lg:mb-0"
    >
      <div className="flex flex-col items-center text-center">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-gray-500 mt-1">{user.role}</p>
        <p className="text-sm text-gray-400">{user.department}</p>
        
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex items-center text-gray-600">
            <Mail size={16} className="mr-2" />
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Globe size={16} className="mr-2" />
            <span className="text-sm">{user.location}</span>
          </div>
        </div>

        <div className="w-full mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {user.stats.projectsCompleted}
              </div>
              <div className="text-xs text-gray-500">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {user.stats.tasksThisWeek}
              </div>
              <div className="text-xs text-gray-500">Tasks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {user.stats.upcomingDeadlines}
              </div>
              <div className="text-xs text-gray-500">Deadlines</div>
            </div>
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