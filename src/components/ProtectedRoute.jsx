// src/components/ProtectedRoute.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { validateToken } from '../utils/authUtils';

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = () => {
      const { isValid, error } = validateToken();
      
      if (!isValid) {
        toast.error(error || 'Please login to continue');
        navigate('/', { replace: true });
        return;
      }

      setIsVerified(true);
      setIsLoading(false);
    };

    verifyAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          <p className="text-gray-500">Verifying...</p>
        </motion.div>
      </div>
    );
  }

  return isVerified ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;