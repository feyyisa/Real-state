import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkServerConnection = useCallback(async () => {
    try {
      await api.get('/health');
      return true;
    } catch (err) {
      console.error('Server connection failed:', err);
      setError('Connection to server failed. Please try again later.');
      return false;
    }
  }, []);

  const getCurrentUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      localStorage.removeItem('token');
      throw err;
    }
  }, []);

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const isServerUp = await checkServerConnection();
      if (!isServerUp) return;

      const userData = await getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  }, [checkServerConnection, getCurrentUser]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      await loadUser();
      navigate('/profile');
    } catch (err) {
      throw err.response?.data?.message || 'Login failed';
    }
  }, [loadUser, navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    refreshAuth: loadUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};