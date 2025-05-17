import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OwnerDashboard = () => {
  const [stats, setStats] = useState({
    totalSold: 0,
    totalRented: 0,
    totalAvailable: 0,
    totalForSale: 0,
    totalForRent: 0,
    bookingsToday: 0,
    bookingsThisWeek: 0,
    monthlyBookings: []
  });

  useEffect(() => {
    // Replace with actual API calls
    fetch('/api/owner/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const chartData = {
    labels: Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('default', { month: 'short' })
    ),
    datasets: [
      {
        label: 'Bookings',
        data: stats.monthlyBookings,
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Bookings Over the Last 12 Months'
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Sold" value={stats.totalSold} />
        <StatCard title="Total Rented" value={stats.totalRented} />
        <StatCard title="Available Properties" value={stats.totalAvailable} />
        <StatCard title="Available for Sale" value={stats.totalForSale} />
        <StatCard title="Available for Rent" value={stats.totalForRent} />
        <StatCard title="Bookings Today" value={stats.bookingsToday} />
        <StatCard title="Bookings This Week" value={stats.bookingsThisWeek} />
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-4 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

export default OwnerDashboard;
