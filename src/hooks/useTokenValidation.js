// src/hooks/useTokenValidation.js

import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { validateToken } from '../utils/authUtils';

export const useTokenValidation = () => {
  const navigate = useNavigate();

  const checkTokenValidity = useCallback(() => {
    const { isValid, error } = validateToken();

    if (!isValid) {
      // Only show error and redirect if not already on login page
      if (window.location.pathname !== '/') {
        toast.error(error || 'Please login to continue');
        navigate('/', { replace: true });
      }
      return false;
    }

    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    if (tokenTimestamp) {
      const now = Date.now();
      const tokenAge = now - parseInt(tokenTimestamp);
      const tokenMaxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (tokenAge > tokenMaxAge) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        
        // Only show error and redirect if not already on login page
        if (window.location.pathname !== '/') {
          toast.error('Session expired. Please login again');
          navigate('/', { replace: true });
        }
        return false;
      }
    }

    return true;
  }, [navigate]);

  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity]);

  return { checkTokenValidity };
};