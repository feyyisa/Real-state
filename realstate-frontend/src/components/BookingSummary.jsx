import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BookingSummary = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (err) {
        console.error('Error decoding token:', err);
        setError('Invalid authentication token');
        setLoading(false);
      }
    } else {
      setError('No authentication token found');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return;
      
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });

        console.log('API Response:', response.data); // Debug log
        
        // Handle the response structure from your example
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setBookings(response.data.data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    switch(status.toLowerCase()) {
      case 'confirmed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'failed':
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-100 text-red-700 rounded-lg max-w-md mx-auto mt-10">
        <p className="font-medium">{error}</p>
        <p className="text-sm mt-2">Please try again later or contact support.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Booking Summary</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center p-6 bg-blue-50 rounded-lg max-w-md mx-auto">
          <p className="text-lg text-gray-600">No bookings found</p>
          <p className="text-sm text-gray-500 mt-2">You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white">
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{booking.property?.title || 'Property'}</h2>
                    <p className="text-gray-600">{booking.property?.listingType || 'N/A'}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.property?.listingType)}`}>
                    {(booking.property?.listingType || 'N/A').toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Date:</span>
                    <span>{formatDate(booking.bookingDetails?.bookingDate)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-ET', {
                        style: 'currency',
                        currency: 'ETB'
                      }).format(booking.bookingDetails?.totalPrice || 0)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.bookingDetails?.paymentStatus)}`}>
                      {(booking.bookingDetails?.paymentStatus || 'N/A').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Booking Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.bookingDetails?.status)}`}>
                      {(booking.bookingDetails?.status || 'N/A').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t mt-3">
                    <h3 className="font-medium text-gray-700 mb-1">Property Owner:</h3>
                    <div className="text-sm">
                      <p>Name: {booking.property?.owner?.name || 'N/A'}</p>
                      <p>Email: {booking.property?.owner?.email || 'N/A'}</p>
                      <p>Phone: {booking.property?.owner?.phone || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t mt-3">
                    <h3 className="font-medium text-gray-700 mb-1">Transaction Reference:</h3>
                    <p className="text-sm font-mono break-all">
                      {booking.bookingDetails?.paymentReceipt || 'Not available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingSummary;