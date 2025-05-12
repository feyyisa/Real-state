import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackForm = ({ propertyId }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "", propertyId: "" });
  const [status, setStatus] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    if (propertyId) {
      setForm((prev) => ({ ...prev, propertyId }));
      fetchFeedback();
    }
  }, [propertyId]);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/feedback/property/${propertyId}`);
      setFeedbackList(res.data || []);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback/submit", form);
      setStatus("Feedback submitted successfully.");
      setForm({ ...form, name: "", email: "", message: "" });
      fetchFeedback(); // Refresh after submission
    } catch (error) {
      console.error("Feedback Error:", error);
      setStatus("Failed to submit feedback.");
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded mt-10">
      <h2 className="text-xl font-bold mb-4">Property Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Feedback"
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Feedback
        </button>
        {status && <p className="text-sm mt-2 text-green-600">{status}</p>}
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">What others say about this property:</h3>
        {feedbackList.length === 0 ? (
          <p className="text-gray-500">No feedback yet.</p>
        ) : (
          <ul className="space-y-2">
            {feedbackList.map((fb, index) => (
              <li key={index} className="border p-2 rounded text-sm text-gray-800">
                <strong>{fb.name}</strong>: {fb.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
