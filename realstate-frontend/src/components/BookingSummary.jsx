import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingSummary = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('/api/bookings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (response.data && Array.isArray(response.data.summary)) {
          setSummary(response.data.summary);
        } else {
          setSummary([]);
        }
      } catch (err) {
        console.error('Error fetching booking summary:', err);
        setError('Failed to load booking summary');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-100 text-red-700 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Booking Summary</h2>
      {summary.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          <p>No bookings found.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {summary.map((booking, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-xl text-gray-800">{booking.title}</strong>
                  <div className="text-sm text-gray-600">
                    {new Date(booking.date).toLocaleDateString()} - {booking.status}
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingSummary;
