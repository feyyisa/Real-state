import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [size, setSize] = useState('');

  const BASE_URL = 'http://localhost:5000'; // Make sure your backend is running on this port

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/properties`);
        console.log('Fetched properties:', res.data);
        setProperties(res.data);
      } catch (error) {
        console.error('Failed to fetch properties:', error.message);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let results = [...properties];

    if (searchTerm) {
      results = results.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location?.city?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice) results = results.filter(p => p.price >= parseFloat(minPrice));
    if (maxPrice) results = results.filter(p => p.price <= parseFloat(maxPrice));
    if (rooms) results = results.filter(p => p.rooms === parseInt(rooms));
    if (size) results = results.filter(p => p.size >= parseFloat(size));

    if (sortBy) {
      results.sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
    }

    setFilteredProperties(results);
  }, [properties, searchTerm, sortBy, minPrice, maxPrice, rooms, size]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Search Properties</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="number"
          placeholder="Min Size (sqm)"
          value={size}
          onChange={e => setSize(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="number"
          placeholder="Number of Rooms"
          value={rooms}
          onChange={e => setRooms(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border p-2 rounded-lg w-full"
        >
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Property Results */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property._id} className="bg-white rounded-2xl shadow-md p-4">
              <img
                src={
                  property.image
                    ? `${BASE_URL}/uploads/${property.image}`
                    : 'https://via.placeholder.com/400x200?text=No+Image'
                }
                alt={property.name}
                className="rounded-xl h-40 w-full object-cover mb-2"
              />
              <h3 className="text-xl font-semibold">{property.name}</h3>
              {property.location ? (
                <p className="text-sm text-gray-600">
                  {property.location.address}, {property.location.city}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">Location not specified</p>
              )}
              <p className="mt-1">💰 ${property.price}</p>
              <p>🛏 {property.rooms} rooms | 📏 {property.size} sqm</p>
              <p>⭐ {property.rating || 0} | 🔥 {property.popularity || 0} views</p>
              <p className="mt-2 text-gray-700">{property.description || 'No description provided.'}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertySearch;
