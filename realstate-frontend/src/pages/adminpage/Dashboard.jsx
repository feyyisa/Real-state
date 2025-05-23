import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalBookings: 0,
    totalEarnings: 0,
    pendingApprovals: 0,
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
          throw new Error(errData.error || 'Failed to fetch admin analytics.');
        }

        const data = await response.json();
        if (data.role !== 'admin') {
          setError('Access denied. This page is for admin users only.');
          return;
        }

        setStats({
          totalUsers: data.totalUsers,
          totalProperties: data.totalProperties,
          totalBookings: data.totalBookings,
          totalEarnings: data.totalEarnings,
          pendingApprovals: data.pendingApprovals,
        });
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching analytics.');
      }
    };

    fetchAnalytics();
  }, []);

  // Chart data per metric:

  const usersChartData = {
    labels: ['Today'],
    datasets: [
      {
        label: 'Total Users',
        data: [stats.totalUsers],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: false,
        tension: 0.3,
        pointRadius: 6,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const propertiesChartData = {
    labels: ['Properties'],
    datasets: [
      {
        label: 'Total Properties',
        data: [stats.totalProperties],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  const bookingsChartData = {
    labels: ['Confirmed Bookings'],
    datasets: [
      {
        data: [stats.totalBookings],
        backgroundColor: ['rgba(245, 158, 11, 0.7)'],
        hoverOffset: 10,
      },
    ],
  };

  const earningsChartData = {
    labels: ['Earnings'],
    datasets: [
      {
        data: [stats.totalEarnings],
        backgroundColor: ['rgba(239, 68, 68, 0.7)'],
        hoverOffset: 15,
      },
    ],
  };

  const pendingApprovalsChartData = {
    labels: ['Pending Approvals'],
    datasets: [
      {
        label: 'Pending Approvals',
        data: [stats.pendingApprovals],
        backgroundColor: 'rgba(147, 197, 253, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  const pendingApprovalsOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Pending Approvals' },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6"> Analytics report</h1>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      {!error && (
        <>
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            <StatCard title="Total Users" value={stats.totalUsers} />
            <StatCard title="Total Properties" value={stats.totalProperties} />
            <StatCard title="Total Bookings" value={stats.totalBookings} />
            <StatCard title="Total Earnings" value={`$${stats.totalEarnings.toLocaleString()}`} />
            <StatCard title="Pending Approvals" value={stats.pendingApprovals} />
          </div>

          {/* Detailed Chart Cards, 2 per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnalyticsCard title="Total Users" value={stats.totalUsers}>
              <Line
                data={usersChartData}
                options={{ responsive: true, plugins: { legend: { display: false } } }}
              />
            </AnalyticsCard>

            <AnalyticsCard title="Total Properties" value={stats.totalProperties}>
              <Bar
                data={propertiesChartData}
                options={{ responsive: true, plugins: { legend: { display: false } } }}
              />
            </AnalyticsCard>

            <AnalyticsCard title="Total Bookings" value={stats.totalBookings}>
              <Pie
                data={bookingsChartData}
                options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
              />
            </AnalyticsCard>

            <AnalyticsCard title="Total Earnings" value={`$${stats.totalEarnings.toLocaleString()}`}>
              <Doughnut
                data={earningsChartData}
                options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
              />
            </AnalyticsCard>

            <AnalyticsCard title="Pending Approvals" value={stats.pendingApprovals}>
              <Bar data={pendingApprovalsChartData} options={pendingApprovalsOptions} />
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

const AnalyticsCard = ({ title, value, children }) => (
  <div className="bg-white shadow rounded-lg p-5 flex flex-col items-center">
    <h2 className="text-xl font-semibold mb-2 text-gray-700">{title}</h2>
    <p className="text-3xl font-bold text-blue-600 mb-4">{value}</p>
    <div className="w-full max-w-xs h-48">{children}</div>
  </div>
);

export default AdminDashboard;
