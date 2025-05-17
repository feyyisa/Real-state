import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/analytics/user-registrations')
      .then(res => setUserData(res.data))
      .catch(err => console.error('User Data Error:', err));

    axios.get('http://localhost:5000/api/analytics/property-prices')
      .then(res => setPriceData(res.data))
      .catch(err => console.error('Price Data Error:', err));
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const registrationMap = userData.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  const priceMap = priceData.reduce((acc, item) => {
    acc[item._id] = item.averagePrice;
    return acc;
  }, {});

  const combinedData = {
    labels: months,
    datasets: [
      {
        label: 'User Registrations',
        data: months.map((_, i) => registrationMap[i + 1] || 0),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Average Property Price',
        data: months.map((_, i) => priceMap[i + 1] || 0),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        yAxisID: 'y',
      },
    ],
  };

  const annotations = months.reduce((acc, month, index) => {
    acc[`line${index}`] = {
      type: 'line',
      scaleID: 'x',
      value: month,
      borderColor: 'gray',
      borderWidth: 1,
      borderDash: [4, 4],
      label: {
        display: false,
      },
    };
    return acc;
  }, {});

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Monthly User Registrations & Average Property Prices',
      },
      annotation: {
        annotations,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Count / Price',
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <Line data={combinedData} options={options} />
    </div>
  );
};
export default Dashboard;
