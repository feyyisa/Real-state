import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const OwnerDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    approvedProperties: 0,
    rejectedProperties: 0,
    pendingProperties: 0,
    totalSoldProperties: 0,
    totalRentedProperties: 0,
    totalSoldBookings: 0,
    totalRentedBookings: 0,
    availableProperties: 0,
    totalEarnings: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized: No token found.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/analytics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to fetch owner analytics.');
        }

        const data = await response.json();
        if (data.role !== 'owner') {
          setError('Access denied. This page is for property owners only.');
          return;
        }

        setStats(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching analytics.');
      }
    };

    fetchAnalytics();
  }, []);

  // Chart data configurations
  const propertyStatusData = {
    labels: ['Approved', 'Rejected', 'Pending'],
    datasets: [
      {
        data: [stats.approvedProperties, stats.rejectedProperties, stats.pendingProperties],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(245, 158, 11, 0.7)'
        ],
      },
    ],
  };

  const propertyTransactionsData = {
    labels: ['Sold Properties', 'Rented Properties', 'Available Properties'],
    datasets: [
      {
        data: [stats.totalSoldProperties, stats.totalRentedProperties, stats.availableProperties],
        backgroundColor: [
          'rgba(139, 92, 246, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(34, 197, 94, 0.7)'
        ],
      },
    ],
  };

  const bookingTransactionsData = {
    labels: ['Completed Sales', 'Completed Rentals'],
    datasets: [
      {
        data: [stats.totalSoldBookings, stats.totalRentedBookings],
        backgroundColor: [
          'rgba(220, 38, 38, 0.7)',
          'rgba(5, 150, 105, 0.7)'
        ],
      },
    ],
  };

  const earningsData = {
    labels: ['Total Earnings'],
    datasets: [
      {
        data: [stats.totalEarnings],
        backgroundColor: ['rgba(234, 179, 8, 0.7)'],
      },
    ],
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Owner Analytics Dashboard</h1>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      {!error && (
        <>
          {/* Property Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Properties" value={stats.totalProperties} />
            <StatCard title="Approved Properties" value={stats.approvedProperties} />
            <StatCard title="Rejected Properties" value={stats.rejectedProperties} />
            <StatCard title="Pending Properties" value={stats.pendingProperties} />
          </div>

          {/* Property Transactions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard title="Properties Sold" value={stats.totalSoldProperties} />
            <StatCard title="Properties Rented" value={stats.totalRentedProperties} />
            <StatCard title="Available Properties" value={stats.availableProperties} />
          </div>


          {/* Financials */}
          <div className="mb-8">
            <StatCard 
              title="Total Earnings" 
              value={`$${stats.totalEarnings.toLocaleString()}`} 
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnalyticsCard title="Property Status">
              <Pie data={propertyStatusData} />
            </AnalyticsCard>

            <AnalyticsCard title="Property Transactions">
              <Doughnut data={propertyTransactionsData} />
            </AnalyticsCard>

            <AnalyticsCard title="Booking Transactions">
              <Doughnut data={bookingTransactionsData} />
            </AnalyticsCard>

            <AnalyticsCard title="Total Earnings">
              <Bar data={earningsData} />
            </AnalyticsCard>
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-lg p-4 text-center">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-2xl font-bold text-blue-600 mt-2">{value}</p>
  </div>
);

const AnalyticsCard = ({ title, children }) => (
  <div className="bg-white shadow rounded-lg p-5">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
    <div className="w-full h-64">{children}</div>
  </div>
);

export default OwnerDashboard;