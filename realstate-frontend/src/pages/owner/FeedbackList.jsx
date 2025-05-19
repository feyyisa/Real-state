import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FeedbackList({ propertyId }) {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/feedback/${propertyId}`).then((res) => {
      setFeedbacks(res.data);
    });
  }, [propertyId]);

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">User Reviews</h3>
      {feedbacks.map((f) => (
        <div key={f._id} className="border-b py-2">
          <div className="text-yellow-400">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</div>
          <p className="text-sm text-gray-700">{f.comment}</p>
          <p className="text-xs text-gray-400">{new Date(f.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
