import React from 'react';
import { useAuth } from '../context/AuthContext';

const OwnerDashboardHeader = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-xl font-bold">OwnerDashboardHeader</div>
      <div className="flex items-center space-x-4">
        <span>Welcome, Our owner</span>
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

export default OwnerDashboardHeader;
