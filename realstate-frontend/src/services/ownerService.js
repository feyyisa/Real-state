import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getOwnerStats = async (ownerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/owner/${ownerId}/stats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching owner stats:', error);
    throw error;
  }
};

export const getOwnerBookings = async (ownerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/owner/${ownerId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching owner bookings:', error);
    throw error;
  }
};