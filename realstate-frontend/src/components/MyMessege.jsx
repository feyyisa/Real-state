import { useState, useEffect } from "react";
import axios from "axios";

function UserMessages({ userEmail: propUserEmail }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(propUserEmail || "");
  const [expandedIndex, setExpandedIndex] = useState(null); // For toggling message details

  // Get email from localStorage if not passed as prop
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

  // Fetch messages for the user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userEmail) return;

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token"); // JWT token for auth

        const res = await axios.get(
          `http://localhost:5000/api/message/user/${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(res.data)) {
          setMessages(res.data);
        } else {
          throw new Error("Unexpected response format");
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

  // Toggle dropdown to show/hide message details
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (loading) return <div className="text-blue-500">Loading messages...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!messages.length)
    return <div className="text-gray-500">You have no messages yet.</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Messages</h2>

      {messages.map((msg, i) => (
        <div
          key={msg._id || i}
          className="border border-gray-300 rounded-md mb-4 shadow-sm bg-white cursor-pointer"
          onClick={() => toggleExpand(i)}
        >
          {/* Summary line */}
          <div className="p-4 flex justify-between items-center">
            <p className="font-medium text-gray-800">
              Message #{i + 1} - {new Date(msg.createdAt).toLocaleDateString()}
            </p>
            <button className="text-blue-600 hover:underline">
              {expandedIndex === i ? "Hide Details" : "Show Details"}
            </button>
          </div>

          {/* Details dropdown */}
          {expandedIndex === i && (
            <div className="border-t border-gray-200 p-4 bg-gray-50 text-gray-700">
              <p>
                <strong>Your message:</strong> {msg.message}
              </p>
              <p className="mt-3">
                <strong>Admin response:</strong>{" "}
                {msg.response ? msg.response : "No response yet."}
              </p>
              {msg.response && (
                <>
                  <p className="mt-2 text-sm text-gray-500">
                    Responded by: {msg.respondedBy || "Admin"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Responded at:{" "}
                    {msg.respondedAt
                      ? new Date(msg.respondedAt).toLocaleString()
                      : "N/A"}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default UserMessages;
