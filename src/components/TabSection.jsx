import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, Settings, Shield, FileText, MessageSquare, Bell, Lock } from 'lucide-react';

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
    { id: 'activity', icon: Activity, label: 'Activity' },
    { id: 'settings', icon: Settings, label: 'Settings' }
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

          {activeTab === 'activity' && (
            <ActivityTab activities={user.recentActivities} />
          )}

          {activeTab === 'settings' && (
            <SettingsTab settings={user.settings} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const ProfileTab = ({ user }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info Fields */}
        <InfoField label="First Name" value={user.first_name} />
        <InfoField label="Last Name" value={user.last_name} />
        <InfoField label="Email" value={user.email} />
        <InfoField label="Location" value={user.location} />
      </div>
    </div>

    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Work Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoField label="Department" value={user.department} />
        <InfoField label="Role" value={user.role} />
        <InfoField label="Time Zone" value={user.timezone} />
        <div>
          <label className="text-sm text-gray-500">Status</label>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {user.status}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const ActivityTab = ({ activities }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  </div>
);

const SettingsTab = ({ settings }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
      <div className="space-y-4">
        <ToggleItem
          icon={Bell}
          label="Notifications"
          enabled={settings.notifications}
        />
        <ToggleItem
          icon={Lock}
          label="Two-Factor Authentication"
          enabled={settings.twoFactorAuth}
        />
      </div>
    </div>
  </div>
);

// Helper Components
const InfoField = ({ label, value }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
);

const ActivityItem = ({ activity }) => (
  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
    <div className="p-2 bg-blue-100 rounded-lg">
      {activity.type === 'login' && <Shield size={18} className="text-blue-600" />}
      {activity.type === 'file_upload' && <FileText size={18} className="text-blue-600" />}
      {activity.type === 'project_update' && <MessageSquare size={18} className="text-blue-600" />}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-800">
        {activity.type === 'login' && 'Logged in'}
        {activity.type === 'file_upload' && activity.details}
        {activity.type === 'project_update' && activity.details}
      </p>
      <p className="text-xs text-gray-500">{activity.date}</p>
    </div>
  </div>
);

const ToggleItem = ({ icon: Icon, label, enabled }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center space-x-3">
      <Icon size={18} className="text-gray-600" />
      <span className="text-gray-700">{label}</span>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-11 h-6 flex items-center rounded-full p-1 ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <motion.div
        className="bg-white w-4 h-4 rounded-full shadow-md"
        animate={{ x: enabled ? 20 : 0 }}
      />
    </motion.button>
  </div>
);