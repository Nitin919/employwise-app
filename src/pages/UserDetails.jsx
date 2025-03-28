import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { ProfileCard } from '../components/ProfileCard';
import { TabSection } from '../components/TabSection';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to continue');
      navigate('/');
      return;
    }

    const fetchUser = async () => {
      const loadingToast = toast.loading('Fetching user details...');
      try {
        const res = await fetch(`https://reqres.in/api/users/${id}`);
        if (!res.ok) throw new Error('User not found');
        
        const data = await res.json();
        
        if (data.data) {
          setUser({
            ...data.data,
            createdAt: '2023-03-28',
            status: 'Active',
            role: 'Senior Developer',
            department: 'Engineering',
            location: 'New York, USA',
            timezone: 'EST (UTC-5)',
            lastActive: '2 hours ago',
            recentActivities: [
              { type: 'login', date: '2024-03-15 09:00', location: 'New York' },
              { type: 'file_upload', date: '2024-03-14 15:30', details: 'Updated profile picture' },
              { type: 'project_update', date: '2024-03-14 11:20', details: 'Completed Sprint Review' }
            ],
            settings: {
              notifications: true,
              twoFactorAuth: true,
              language: 'English',
              theme: 'Light',
              emailNotifications: {
                security: true,
                updates: true,
                newsletter: false
              }
            },
            stats: {
              projectsCompleted: 15,
              tasksThisWeek: 8,
              upcomingDeadlines: 3
            }
          });
          toast.success('User details loaded!', { id: loadingToast });
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user data';
        setError(errorMessage);
        toast.error(errorMessage, { id: loadingToast });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleEdit = () => {
    if (!user) return;
    toast.success('Navigating to edit page...');
    navigate(`/edit/${user.id}`, { state: { user } });
  };

  const handleDelete = async () => {
    if (!user) return;
    
    const deleteToast = toast.loading('Deleting user...');
    try {
      const res = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      
      toast.success('User deleted successfully!', { id: deleteToast });
      navigate('/users');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
      console.error(err);
      toast.error(errorMessage, { id: deleteToast });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg shadow-md">
          {error}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toast('Returning to users list');
                navigate('/users');
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Users</span>
            </motion.button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EmployWise
            </h1>
          </div>
        </div>
      </header>

      <motion.main
        className="max-w-7xl mx-auto px-4 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:space-x-6">
          <ProfileCard 
            user={user} 
            onEdit={handleEdit} 
            onDelete={() => setShowDeleteModal(true)} 
          />
          <TabSection 
            user={user} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </motion.div>
      </motion.main>

      <DeleteConfirmationModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default UserDetails;