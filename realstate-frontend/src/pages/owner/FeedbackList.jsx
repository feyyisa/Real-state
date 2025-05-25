import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OwnerFeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios
      .get('http://localhost:5000/api/feedback/owner', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setFeedbacks(res.data.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching owner feedback:', err);
      });
  }, [token]);

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">Feedback on Your Properties</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbacks.map((f) => (
          <div key={f._id} className="border-b py-2">
            <div className="text-yellow-400">
              {'★'.repeat(f.rating) + '☆'.repeat(5 - f.rating)}
            </div>
            <p className="text-sm text-gray-700">{f.comment}</p>
            <p className="text-xs text-gray-400">
              Property: {f.property.title}
            </p>
            <p className="text-xs text-gray-400">
              Reviewed by: {f.user.name} ({f.user.email})
            </p>
            <p className="text-xs text-gray-400">
              {new Date(f.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
