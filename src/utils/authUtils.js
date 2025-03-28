// Create a new file for auth utilities
export const validateToken = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return {
        isValid: false,
        error: 'No token found'
      };
    }
  
    try {
      // Add token validation logic here
      // For example, you could check token format, expiration, etc.
      
      // Simple token format validation (example)
      if (typeof token !== 'string' || token.length < 10) {
        throw new Error('Invalid token format');
      }
  
      // You could also add API call to validate token with backend
      // const response = await fetch('https://reqres.in/api/validate-token', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // if (!response.ok) throw new Error('Invalid token');
  
      return {
        isValid: true,
        token
      };
    } catch (error) {
      localStorage.removeItem('token'); // Clear invalid token
      return {
        isValid: false,
        error: error.message
      };
    }
  };