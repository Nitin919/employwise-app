import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { validateToken } from '../utils/authUtils';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const { isValid } = validateToken();
    if (isValid) {
      navigate('/users');
    }
  }, [navigate]);

  // Basic email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (password.length < 3) {
      toast.error('Password is too short');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Logging in...');

    try {
      const res = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Store token and timestamp
        localStorage.setItem('token', data.token);
        localStorage.setItem('tokenTimestamp', Date.now().toString());
        
        toast.success('Login successful!', { id: loadingToast });
        navigate('/users');
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          EmployWise Login
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="eve.holt@reqres.in"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="cityslicka"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </motion.button>

          {/* Optional: Add demo credentials */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Demo: eve.holt@reqres.in / cityslicka
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;