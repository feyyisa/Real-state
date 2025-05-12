import React from 'react';
import OwnerSidebar from '../../components/OwnerSidebar';
import OwnerDashboardHeader from '../../components/OwnerDashboardHeader';

import { Outlet } from 'react-router-dom';

const OwnerDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <OwnerSidebar />
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <OwnerDashboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet /> {/* Nested routes will be shown here */}
        </main>
      </div>
    </div>
  );
};
export default OwnerDashboard;
