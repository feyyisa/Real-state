import { useState } from 'react';
import axios from 'axios';

export default function PropertyReview({ propertyId }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');

  const handleReviewSubmit = async () => {
    try {
      const res = await axios.post(`/api/reviews`, {
        propertyId,
        rating,
        review,
      });
      setMessage('Review submitted successfully!');
    } catch (err) {
      setMessage('Failed to submit review.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Rate and Review Property</h2>

      {message && <p>{message}</p>}

      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-semibold">Rating (1 to 5 stars):</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          className="px-4 py-2 border rounded-md w-full mt-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="review" className="block text-sm font-semibold">Review:</label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-4 border rounded-md mt-2"
        ></textarea>
      </div>

      <button
        onClick={handleReviewSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Submit Review
      </button>
    </div>
  );
}
