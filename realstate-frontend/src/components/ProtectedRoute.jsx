import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
navigate('/login');

    }
  }, [token, navigate, location]);

  return token ? children : null;
};

export default ProtectedRoute;
