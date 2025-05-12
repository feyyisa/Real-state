import { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerBookingManager = ({ ownerId }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get(`http://localhost:5000/api/bookings/owner/${ownerId}`);
    setBookings(res.data);
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status });
    fetchBookings();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Booking Requests</h2>
      {bookings.map(b => (
        <div key={b._id} className="border p-4 mb-4 rounded">
          <p><strong>Property:</strong> {b.propertyId?.title}</p>
          <p><strong>Customer:</strong> {b.customerId?.name}</p>
          <p><strong>Message:</strong> {b.message}</p>
          <p><strong>Status:</strong> {b.status}</p>
          {b.status === 'pending' && (
            <div className="mt-2">
              <button className="mr-2 bg-green-500 px-3 py-1 text-white rounded" onClick={() => updateStatus(b._id, 'accepted')}>Accept</button>
              <button className="bg-red-500 px-3 py-1 text-white rounded" onClick={() => updateStatus(b._id, 'rejected')}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OwnerBookingManager;
