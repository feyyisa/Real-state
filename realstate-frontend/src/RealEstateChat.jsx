import React, { useState, useRef, useEffect } from 'react';

const RealEstateChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! Need help with buying, selling, or searching properties?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    const userInput = input;
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/gemini/real-estate-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userInput }),
      });

      const data = await response.json();

      const botText = data.answer || 'Sorry, I couldn’t find a good answer.';
      setMessages(prev => [...prev, { from: 'bot', text: botText }]);
    } catch (err) {
      console.error('❌ Error contacting server:', err);
      setError('Sorry, there was a problem. Please try again later.');
      setMessages(prev => [...prev, { from: 'bot', text: '⚠️ Network or server error.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl mt-4 flex flex-col border border-gray-300">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg font-semibold">
            Real Estate Chat
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[75%] ${
                  msg.from === 'user'
                    ? 'bg-blue-100 self-end text-right ml-auto'
                    : 'bg-gray-100 self-start text-left mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 text-sm">⏳ Typing...</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-gray-200 flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              type="text"
              placeholder="Ask something..."
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <button
              onClick={sendMessage}
              className="ml-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              disabled={loading}
            >
              Send
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-xs p-2">{error}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default RealEstateChat;
