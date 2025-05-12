import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackManage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [responses, setResponses] = useState({}); // Stores response input by id

  // Fetch feedback from backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedback/all");
        setFeedbackList(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchFeedback();
  }, []);

  // Handle input change for response field
  const handleInputChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  // Submit response to backend
  const handleRespond = async (id) => {
    const response = responses[id];
    if (!response?.trim()) return;

    try {
      await axios.put(`http://localhost:5000/api/feedback/respond/${id}`, {
        response,
      });

      const updated = feedbackList.map((f) =>
        f._id === id ? { ...f, response } : f
      );
      setFeedbackList(updated);
      setResponses((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Response Error:", err);
    }
  };

  // Delete feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/delete/${id}`);
      setFeedbackList((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Feedback</h1>
      <p className="mb-4">Here you can view and respond to user feedback.</p>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">User</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Response</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((feedback) => (
            <tr key={feedback._id} className="border">
              <td className="p-2 border">{feedback.name}</td>
              <td className="p-2 border">{feedback.email}</td>
              <td className="p-2 border">{feedback.message}</td>
              <td className="p-2 border">
                {feedback.response ? (
                  feedback.response
                ) : (
                  <input
                    type="text"
                    value={responses[feedback._id] || ""}
                    onChange={(e) =>
                      handleInputChange(feedback._id, e.target.value)
                    }
                    placeholder="Type your response..."
                    className="p-1 border rounded w-full"
                  />
                )}
              </td>
              <td className="p-2 border flex space-x-2">
                {!feedback.response && (
                  <button
                    onClick={() => handleRespond(feedback._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Respond
                  </button>
                )}
                <button
                  onClick={() => handleDelete(feedback._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackManage;
