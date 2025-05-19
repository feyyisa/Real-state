import { useState, useEffect } from "react";
import axios from "axios";

function UserMessages({ userEmail: propUserEmail }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(propUserEmail || "");

  useEffect(() => {
    if (!propUserEmail) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUserEmail(parsed.email || "");
        } catch (err) {
          console.error("Failed to parse user from localStorage", err);
        }
      }
    }
  }, [propUserEmail]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userEmail) return;

      try {
        const token = localStorage.getItem("token");  // Get JWT token from localStorage

        // Replace the placeholder ':userId' with actual 'userEmail' or 'userId'
        const res = await axios.get(`http://localhost:5000/api/feedback/user/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the JWT token for authentication
          },
        });

        if (Array.isArray(res.data)) {
          setMessages(res.data);  // Set the response data as messages
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
        setError("Failed to load messages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userEmail]);

  if (loading) return <div className="text-blue-500">Loading messages...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!messages.length)
    return <div className="text-gray-500">You have no messages yet.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Messages</h2>
      {messages.map((msg, i) => (
        <div
          key={i}
          className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800"
        >
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            From: {msg.respondedBy || "Admin"}
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {msg.response || "No response yet."}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(msg.respondedAt || msg.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UserMessages;
