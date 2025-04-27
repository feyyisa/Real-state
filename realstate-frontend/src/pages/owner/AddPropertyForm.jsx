import React, { useState } from 'react';
import axios from 'axios';

const AddPropertyForm = ({ ownerId }) => {
  const [formData, setFormData] = useState({
    owner: ownerId, // Pass owner ID dynamically
    location: '',
    price: '',
    type: 'rent',
    size: '',
    status: 'available',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    if (image) data.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/properties', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Property added successfully!');
      console.log('Property added:', res.data.property);

      // Reset form
      setFormData({
        owner: ownerId,
        location: '',
        price: '',
        type: 'rent',
        size: '',
        status: 'available',
      });
      setImage(null);
    } catch (err) {
      console.error('❌ Error adding property:', err.response?.data || err.message);
      alert('❌ Failed to add property');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md bg-white rounded">
      <h2 className="text-2xl mb-4 font-semibold">Add Property</h2>
      {['location', 'price', 'size'].map((field) => (
        <input
          key={field}
          type={field === 'price' ? 'number' : 'text'}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full border p-2 mb-3 rounded"
          required
        />
      ))}
      <select name="type" value={formData.type} onChange={handleChange} className="w-full border p-2 mb-3 rounded">
        <option value="rent">Rent</option>
        <option value="sell">Sell</option>
      </select>
      <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 mb-3 rounded">
        <option value="available">Available</option>
        <option value="booked">Booked</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full border p-2 mb-4"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Submit
      </button>
    </form>
  );
};
export default AddPropertyForm;
