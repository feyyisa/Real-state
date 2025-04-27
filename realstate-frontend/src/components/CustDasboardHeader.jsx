import React from 'react';
import { useAuth } from '../context/AuthContext';

const CustDashboardHeader = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex items-center space-x-4">
        <span>Welcome, Our Customer</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default CustDashboardHeader;
