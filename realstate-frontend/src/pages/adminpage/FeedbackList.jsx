import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = ({ propertyId }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/feedback/property/${propertyId}`);
        setFeedbacks(res.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    if (propertyId) fetchFeedback();
  }, [propertyId]);

  return (
    <div className="mt-4">
      <h4 className="font-bold mb-2">User Feedback</h4>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbacks.map((fb, index) => (
          <div key={index} className="border p-2 rounded mb-2">
            <p><strong>Rating:</strong> {fb.rating}</p>
            <p>{fb.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
