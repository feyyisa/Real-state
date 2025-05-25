import React, { useEffect, useState } from 'react';

export default function CustomerAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/announcements')
      .then((res) => res.json())
      .then(setAnnouncements)
      .catch(console.error);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Latest Announcements</h1>
      <ul>
        {announcements.map(({ _id, title, message, createdAt }) => (
          <li key={_id} style={{ marginBottom: 15, borderBottom: '1px solid #ddd' }}>
            <strong>{title}</strong> <small>({new Date(createdAt).toLocaleString()})</small>
            <p>{message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
