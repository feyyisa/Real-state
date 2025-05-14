import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      // Save the path for redirect after login
      localStorage.setItem('redirectAfterLogin', location.pathname);
      navigate('/login');
    } else if (!allowedRoles.includes(role)) {
      // If role does not match allowedRoles, redirect to home
      navigate('/');
    } else {
      setLoading(false); // Access granted
    }
  }, [allowedRoles, location.pathname, navigate]);

  // Optional: show a loading spinner while checking auth
  if (loading) return <div className="text-center py-10">Checking permissions...</div>;

  return children;
};

export default ProtectedRoute;