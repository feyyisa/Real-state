import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ propertyId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const SERVER_URL = 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('You must be logged in to submit feedback.');
        setSubmitting(false);
        return;
      }

      await axios.post(`${SERVER_URL}/api/feedback`, {
        propertyId,
        rating,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess(true);
      setComment('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('You must be logged in to submit feedback.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Leave Feedback</h3>

      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          Thank you for your feedback!
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none"
                >
                  {star <= rating ? '★' : '☆'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={submitting || rating === 0}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      )}

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Property Feedback</h4>
        {/* Feedback list goes here */}
      </div>
    </div>
  );
};

export default FeedbackForm;
