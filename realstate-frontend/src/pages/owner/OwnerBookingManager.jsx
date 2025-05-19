import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FiEye, FiCheck, FiX, FiLoader } from 'react-icons/fi';

const OwnerBookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Get owner ID from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setOwnerId(decoded.id);
    }
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/bookings/owner/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBookings(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerId) {
      fetchBookings();
    }
  }, [ownerId]);

  const updateBookingStatus = async (id, status) => {
    try {
      setActionLoading(true);
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update booking');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs";
    switch(status?.toLowerCase()) {
      case 'paid':
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'unpaid':
      case 'cancelled':
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        <p>{error}</p>
        <button 
          onClick={() => setError('')}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Booking Management</h1>
      
      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 text-sm">{booking.property?.title}</div>
                    <div className="text-xs text-gray-500">{booking.property?.listingType}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {formatDate(booking.bookingDetails?.bookingDate)}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {formatCurrency(booking.bookingDetails?.totalPrice)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(booking.bookingDetails?.paymentStatus)}>
                      {booking.bookingDetails?.paymentStatus?.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(booking.bookingDetails?.status)}>
                      {booking.bookingDetails?.status?.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="p-1 text-blue-600 hover:text-blue-900 rounded-full hover:bg-blue-50 relative group"
                      title="View Details"
                    >
                      <FiEye className="w-4 h-4" />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                      </span>
                    </button>
                    {booking.bookingDetails?.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="p-1 text-green-600 hover:text-green-900 rounded-full hover:bg-green-50 relative group"
                          disabled={actionLoading}
                          title="Confirm Booking"
                        >
                          {actionLoading ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiCheck className="w-4 h-4" />}
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Confirm Booking
                          </span>
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'rejected')}
                          className="p-1 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50 relative group"
                          disabled={actionLoading}
                          title="Reject Booking"
                        >
                          {actionLoading ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiX className="w-4 h-4" />}
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Reject Booking
                          </span>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Property Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Title:</span> {selectedBooking.property?.title}</p>
                    <p><span className="font-medium">Type:</span> {selectedBooking.property?.listingType}</p>
                    <p><span className="font-medium">Price:</span> {formatCurrency(selectedBooking.property?.price)}</p>
                    <p><span className="font-medium">Location:</span> {selectedBooking.property?.location?.city}, {selectedBooking.property?.location?.region}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedBooking.bookedBy?.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedBooking.bookedBy?.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedBooking.bookedBy?.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Booking Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Booking Date:</span> {formatDate(selectedBooking.bookingDetails?.bookingDate)}</p>
                    <p><span className="font-medium">Total Amount:</span> {formatCurrency(selectedBooking.bookingDetails?.totalPrice)}</p>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Payment Status:</span>
                      <span className={getStatusBadge(selectedBooking.bookingDetails?.paymentStatus)}>
                        {selectedBooking.bookingDetails?.paymentStatus?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Booking Status:</span>
                      <span className={getStatusBadge(selectedBooking.bookingDetails?.status)}>
                        {selectedBooking.bookingDetails?.status?.toUpperCase()}
                      </span>
                    </div>
                    <p><span className="font-medium">Transaction Ref:</span> {selectedBooking.bookingDetails?.paymentReceipt}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer ID</h3>
                  {selectedBooking.bookingDetails?.bookerIdCardFile && (
                    <img 
                      src={`http://localhost:5000/${selectedBooking.bookingDetails.bookerIdCardFile.replace(/\\/g, '/')}`} 
                      alt="Customer ID Card"
                      className="mt-2 border rounded max-w-full h-auto max-h-40 object-contain"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              {selectedBooking.bookingDetails?.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'confirmed');
                      setSelectedBooking(null);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center"
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiCheck className="mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'rejected');
                      setSelectedBooking(null);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center"
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiX className="mr-2" />
                        Reject Booking
                      </>
                    )}
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerBookingManager;