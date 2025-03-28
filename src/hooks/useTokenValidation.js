import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { validateToken } from '../utils/authUtils';

export const useTokenValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const checkTokenValidity = () => {
    const { isValid, error } = validateToken();

    if (!isValid) {

      if (window.location.pathname !== '/') {
        toast.error(error || 'Please login to continue');
        navigate('/');
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
        toast.error('Session expired. Please login again');
        navigate('/');
        return false;
      }
    }

    return true;
  };

  return { checkTokenValidity };
};