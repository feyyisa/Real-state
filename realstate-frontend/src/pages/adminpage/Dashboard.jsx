import React from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';

import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet /> {/* Nested routes will be shown here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
