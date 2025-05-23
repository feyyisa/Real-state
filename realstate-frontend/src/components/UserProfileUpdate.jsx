import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const { data } = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Handle both direct and nested response formats
        const responseData = data.user || data;
        const userData = {
          name: responseData.name || '',
          email: responseData.email || '',
          phone: responseData.phone || '',
          role: responseData.role || '',
          password: '',
        };

        setUser(userData);
        setOriginalUser(userData);
      } catch (error) {
        console.error('Profile fetch error:', error);
        setMessage({ 
          text: error.response?.data?.message || 'Failed to load profile', 
          type: 'error' 
        });
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset to original values if canceling edit
      setUser(originalUser);
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(
        'http://localhost:5000/api/auth/profile',
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
          ...(user.password && { password: user.password }),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setMessage({ 
        text: data.message || 'Profile updated successfully', 
        type: 'success' 
      });
      setIsEditing(false);

      // Update local state with returned data
      const updatedData = data.user || data;
      setUser({ ...updatedData, password: '' });
      setOriginalUser(updatedData);
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({
        text: error.response?.data?.message || 'Failed to update profile',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        {!isEditing ? (
          <button
            onClick={handleEditToggle}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiEdit className="mr-1" /> Edit
          </button>
        ) : (
          <button
            onClick={handleEditToggle}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <FiX className="mr-1" /> Cancel
          </button>
        )}
      </div>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={user.role}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {isEditing && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter new password (leave blank to keep current)"
            />
          </div>
        )}

        {isEditing && (
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
          >
            {loading ? (
              'Saving...'
            ) : (
              <>
                <FiSave className="mr-2" /> Save Changes
              </>
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
