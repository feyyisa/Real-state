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
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const OwnerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Unauthorized: No token found');
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
          throw new Error(errData.message || 'Failed to fetch analytics');
        }

        const data = await response.json();

        setStats({
          propertyCount: Number(data.propertyCount || 0),
          totalBookings: Number(data.totalBookings || 0),
          pendingProperties: Number(data.pendingProperties || 0),
          totalEarnings: Number(data.totalEarnings || 0),
        });
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching analytics data.');
      }
    };

    fetchAnalytics();
  }, []);

  if (!stats) {
    return <p className="text-gray-500">Loading analytics...</p>;
  }

  // Chart data for each metric separately

  const propertyChartData = {
    labels: ['Properties'],
    datasets: [
      {
        label: 'Total Properties',
        data: [stats.propertyCount],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 8,
      },
    ],
  };

  const bookingsChartData = {
    labels: ['Confirmed Bookings'],
    datasets: [
      {
        label: 'Confirmed Bookings',
        data: [stats.totalBookings],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 8,
      },
    ],
  };

  const pendingChartData = {
    labels: ['Pending Properties'],
    datasets: [
      {
        label: 'Pending Properties',
        data: [stats.pendingProperties],
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderRadius: 8,
      },
    ],
  };

  const earningsChartData = {
    labels: ['Total Earnings'],
    datasets: [
      {
        label: 'Total Earnings',
        data: [stats.totalEarnings],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Owner Dashboard</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <StatCard title="Total Properties" value={stats.propertyCount} />
        <StatCard title="Confirmed Bookings" value={stats.totalBookings} />
        <StatCard title="Pending Properties" value={stats.pendingProperties} />
        <StatCard title="Total Earnings" value={`$${stats.totalEarnings.toLocaleString()}`} />
      </div>

      {/* Individual Chart Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnalyticsCard title="Total Properties" value={stats.propertyCount}>
          <Bar data={propertyChartData} options={chartOptions} />
        </AnalyticsCard>

        <AnalyticsCard title="Confirmed Bookings" value={stats.totalBookings}>
          <Bar data={bookingsChartData} options={chartOptions} />
        </AnalyticsCard>

        <AnalyticsCard title="Pending Properties" value={stats.pendingProperties}>
          <Bar data={pendingChartData} options={chartOptions} />
        </AnalyticsCard>

        <AnalyticsCard title="Total Earnings" value={`$${stats.totalEarnings.toLocaleString()}`}>
          <Bar data={earningsChartData} options={chartOptions} />
        </AnalyticsCard>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-4 text-center">
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

export default OwnerDashboard;
