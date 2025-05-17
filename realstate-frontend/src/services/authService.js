// services/authService.js
import api from './api'; // Ensure this is your axios or API configuration file

const authService = {
  // Register user
  register: async (userData) => {
    try {
      // Send POST request to register user
      const response = await api.post('/auth/register', {
        ...userData,
        favorites: [], // Default empty array for favorites
        alerts: [], // Default empty array for alerts
      });
      return {
        success: true,
        data: response.data, // Return user data from successful registration
      };
    } catch (error) {
      // Handle error response if registration fails
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        error: error.response?.data || error,
      };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      // Send POST request to login user
      const response = await api.post('/auth/login', credentials);

      if (response.data.token) {
        // Store token and user data in localStorage on successful login
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return {
        success: true,
        data: response.data, // Return user data from successful login
      };
    } catch (error) {
      // Handle error response if login fails
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        error: error.response?.data || error,
      };
    }
  },

  // Logout user
  logout: () => {
    // Remove token and user from localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true, message: 'Logged out successfully' };
  },

  // Check if token exists in localStorage
  isAuthenticated: () => {
    // Return true if token exists, false if not
    return !!localStorage.getItem('token');
  },

  // Check auth and get user data
  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'No token found' }; // No token, not authenticated
      }
      // Send GET request to check authentication status
      const response = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      });

      return {
        success: true,
        data: response.data, // Return user data from the response
      };
    } catch (error) {
      // Handle error response if authentication check fails
      return {
        success: false,
        message: error.response?.data?.message || 'Auth check failed',
        error: error.response?.data || error,
      };
    }
  },
};
export default authService;
