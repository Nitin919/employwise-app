import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { UserCard } from '../components/UserCard';
import { EditUserModal } from '../components/EditUserModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { useTokenValidation } from '../hooks/useTokenValidation';
import { Loader, Search, Filter, Download, UserPlus } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { checkTokenValidity } = useTokenValidation();

  useEffect(() => {
    if (!checkTokenValidity()) {
      return;
    }
    fetchUsers(page);
  }, [page,checkTokenValidity]);

  const fetchUsers = async (pageNum) => {
    setIsLoading(true);
    const loadingToast = toast.loading('Fetching users...');
    try {
      const res = await fetch(`https://reqres.in/api/users?page=${pageNum}`);
      if (!res.ok) throw new Error('Failed to fetch users');
      
      const data = await res.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
      toast.success('Users loaded successfully', { id: loadingToast });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error.message, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleView = (user) => {
    navigate(`/users/${user.id}`);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    setDeleteUser(null);
    const deleteToast = toast.loading('Deleting user...');
    
    try {
      const res = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      
      setUsers(users.filter((u) => u.id !== userId));
      toast.success('User deleted successfully', { id: deleteToast });
    } catch (err) {
      console.error(err);
      toast.error(err.message, { id: deleteToast });
    }
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    toast.success('User updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              EmployWise
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0"
        >
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white shadow-sm rounded-lg text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <Filter size={18} />
              <span>Filter</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white shadow-sm rounded-lg text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <Download size={18} />
              <span>Export</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <UserPlus size={18} />
              <span>New User</span>
            </motion.button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-blue-600" size={40} />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onView={handleView}
                  onEdit={handleEditClick}
                  onDelete={() => setDeleteUser(user)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mt-8"
        >
          <p className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </p>
          <div className="space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              disabled={page <= 1}
              className={`px-4 py-2 rounded-lg text-sm ${
                page <= 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              ← Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={page >= totalPages}
              className={`px-4 py-2 rounded-lg text-sm ${
                page >= totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              Next →
            </motion.button>
          </div>
        </motion.div>
      </main>

      {showModal && editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => {
            setShowModal(false);
            setEditingUser(null);
          }}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {deleteUser && (
        <DeleteConfirmationModal
          isOpen={!!deleteUser}
          onClose={() => setDeleteUser(null)}
          onConfirm={() => handleDelete(deleteUser.id)}
          userName={`${deleteUser.first_name} ${deleteUser.last_name}`}
        />
      )}
    </div>
  );
}

export default UsersList;