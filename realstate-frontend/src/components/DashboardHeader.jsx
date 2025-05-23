import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardHeader = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="relative flex items-center p-4 bg-white shadow-md">
      {/* Centered title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
        Admin Dashboard
      </div>

      {/* Right side logout */}
      <div className="ml-auto flex items-center space-x-4">
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

export default DashboardHeader;
