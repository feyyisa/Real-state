import { useState } from 'react';
import axios from 'axios';

export default function FeedbackForm({ propertyId, userId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitFeedback = async () => {
    try {
      // POST to the correct endpoint for feedback submission
      await axios.post(`http://localhost:5000/api/feedback/property/${propertyId}`, {
        userId,
        rating,
        comment,
      });
      alert('Feedback submitted!');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback.');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Leave a Review</h2>
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Write your review..."
      />
      <button
        onClick={submitFeedback}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}
