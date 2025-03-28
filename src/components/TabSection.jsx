import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

export const TabSection = ({ user, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

  return (
    <motion.div variants={itemVariants} className="w-full lg:w-2/3">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex space-x-6 border-b border-gray-200">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-4 -mb-px ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {activeTab === 'profile' && (
            <ProfileTab user={user} />
          )}

          {activeTab === 'contact' && (
            <ContactTab user={user} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const ProfileTab = ({ user }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">User Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoField label="First Name" value={user.first_name} />
        <InfoField label="Last Name" value={user.last_name} />
        <InfoField label="Email" value={user.email} />
        <InfoField label="ID" value={user.id} />
      </div>
    </div>
  </div>
);

const ContactTab = ({ user }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="text-blue-600" size={20} />
          <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
            {user.email}
          </a>
        </div>
      </div>
    </div>
  </div>
);

const InfoField = ({ label, value }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
);

TabSection.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

export default TabSection;