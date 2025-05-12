// src/services/api.js
import axios from 'axios';

// ✅ Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Use general API base
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Add token to headers if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
