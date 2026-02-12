import axios from 'axios';

const API_BASE_URL = 'http://localhost:5005';

const userApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication service for microservices
const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await userApi.post('/auth/register', userData);
      return { success: true, user: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await userApi.post('/auth/login', credentials);
      return { success: true, user: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  },

  // Get user by ID
  getUser: async (userId) => {
    try {
      const response = await userApi.get(`/users/${userId}`);
      return { success: true, user: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Failed to fetch user' 
      };
    }
  }
};

export default authService;
