import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackManage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [responses, setResponses] = useState({});

  // ✅ Fetch all messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/message");
        setFeedbackList(res.data.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, []);

  // ✅ Handle input change
  const handleInputChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  // ✅ Send response to a message
  const handleRespond = async (id) => {
    const response = responses[id];
    if (!response?.trim()) return;

    try {
      await axios.put(`http://localhost:5000/api/message/respond/${id}`, {
        response,
      });

      const updated = feedbackList.map((msg) =>
        msg._id === id ? { ...msg, response } : msg
      );
      setFeedbackList(updated);
      setResponses((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Error sending response:", err);
    }
  };

  // ✅ Delete a message
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/message/delete/${id}`);
      setFeedbackList((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Feedback</h1>
      <p className="mb-4">View, respond to, or delete user feedback messages.</p>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Response</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((msg) => (
            <tr key={msg._id} className="border">
              <td className="p-2 border">{msg.name}</td>
              <td className="p-2 border">{msg.email}</td>
              <td className="p-2 border">{msg.message}</td>
              <td className="p-2 border">
                {msg.response ? (
                  msg.response
                ) : (
                  <input
                    type="text"
                    value={responses[msg._id] || ""}
                    onChange={(e) => handleInputChange(msg._id, e.target.value)}
                    placeholder="Type your response..."
                    className="p-1 border rounded w-full"
                  />
                )}
              </td>
              <td className="p-2 border flex space-x-2">
                {!msg.response && (
                  <button
                    onClick={() => handleRespond(msg._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Respond
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg._id)}
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
