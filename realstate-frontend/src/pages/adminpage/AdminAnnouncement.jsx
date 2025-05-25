import React, { useState, useEffect } from 'react';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);

  const API_URL = 'http://localhost:5000/api/announcements';

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setAnnouncements(data);
  };

  const resetForm = () => {
    setTitle('');
    setMessage('');
    setEditId(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !message.trim()) {
      setError('Both title and message are required.');
      return;
    }

    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `${API_URL}/${editId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Failed to save announcement');
        return;
      }

      resetForm();
      fetchAnnouncements();
    } catch {
      setError('Network error');
    }
  };

  const handleEdit = (announcement) => {
    setTitle(announcement.title);
    setMessage(announcement.message);
    setEditId(announcement._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to delete');
        return;
      }
      fetchAnnouncements();
    } catch {
      alert('Network error');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>Admin Announcements</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <div>
          <label>Title:</label><br />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div>
          <label>Message:</label><br />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">{editId ? 'Update' : 'Add'} Announcement</button>
        {editId && <button type="button" onClick={resetForm} style={{ marginLeft: 10 }}>Cancel</button>}
      </form>

      <h2>Existing Announcements</h2>
      <ul>
        {announcements.map(({ _id, title, message, createdAt }) => (
          <li key={_id} style={{ marginBottom: 15, borderBottom: '1px solid #ddd' }}>
            <strong>{title}</strong> <small>({new Date(createdAt).toLocaleString()})</small>
            <p>{message}</p>
            <button onClick={() => handleEdit({ _id, title, message })}>Edit</button>
            <button onClick={() => handleDelete(_id)} style={{ marginLeft: 10, color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
