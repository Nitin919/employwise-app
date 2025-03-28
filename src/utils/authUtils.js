// src/utils/authUtils.js

export const validateToken = () => {
  const token = localStorage.getItem('token');
  const tokenTimestamp = localStorage.getItem('tokenTimestamp');
  
  if (!token) {
    return {
      isValid: false,
      error: 'No token found'
    };
  }

  try {
    // Token format validation
    if (typeof token !== 'string' || token.length < 10) {
      throw new Error('Invalid token format');
    }

    // Token expiration check (24 hours)
    if (tokenTimestamp) {
      const now = Date.now();
      const tokenAge = now - parseInt(tokenTimestamp);
      const tokenMaxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (tokenAge > tokenMaxAge) {
        throw new Error('Token expired');
      }
    }

    return {
      isValid: true,
      token
    };
  } catch (error) {
    // Clear invalid token
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    
    return {
      isValid: false,
      error: error.message
    };
  }
};

// Helper functions
export const authUtils = {
  getToken: () => localStorage.getItem('token'),
  
  clearToken: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
  },
  
  setToken: (token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenTimestamp', Date.now().toString());
  }
};