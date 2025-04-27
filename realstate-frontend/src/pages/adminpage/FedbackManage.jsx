import React, { useState } from "react";

const FeedbackManage = () => {
  // Sample feedback data
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      message: "Great service! Keep it up.",
      response: "",
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      message: "The app is slow and needs improvement.",
      response: "",
    },
    {
      id: 3,
      user: "Alice Johnson",
      email: "alice@example.com",
      message: "Loving the new features!",
      response: "",
    },
  ]);

  // State for managing the response input
  const [responseInput, setResponseInput] = useState("");

  // Function to handle responding to feedback
  const handleRespond = (id) => {
    if (responseInput.trim()) {
      const updatedFeedback = feedbackList.map((feedback) =>
        feedback.id === id
          ? { ...feedback, response: responseInput }
          : feedback
      );
      setFeedbackList(updatedFeedback);
      setResponseInput("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Feedback</h1>
      <p className="mb-4">Here you can view and respond to user feedback.</p>

      {/* Feedback Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Feedback List</h2>
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
              <tr key={feedback.id} className="border">
                <td className="p-2 border">{feedback.user}</td>
                <td className="p-2 border">{feedback.email}</td>
                <td className="p-2 border">{feedback.message}</td>
                <td className="p-2 border">
                  {feedback.response ? (
                    feedback.response
                  ) : (
                    <input
                      type="text"
                      placeholder="Type your response..."
                      value={responseInput}
                      onChange={(e) => setResponseInput(e.target.value)}
                      className="p-1 border rounded w-full"
                    />
                  )}
                </td>
                <td className="p-2 border">
                  {!feedback.response && (
                    <button
                      onClick={() => handleRespond(feedback.id)}
                      className="bg-blue-500 text-white p-1 rounded"
                    >
                      Respond
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default FeedbackManage;