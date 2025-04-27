import React from 'react';
import CustSidebar from '../../components/CustSidebar';
import CustDasboardHeader from '../../components/CustDasboardHeader';

import { Outlet } from 'react-router-dom';

const CustomerDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <CustSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <CustDasboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet /> {/* Nested routes will be shown here */}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
