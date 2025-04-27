import React, { useState, useEffect } from 'react';

// Example dummy properties data (simulate data from API or props)
const dummyProperties = [
  {
    id: 1,
    name: 'Elegant Villa',
    location: 'Addis Ababa',
    price: 120000,
    rooms: 4,
    size: 250,
    rating: 4.5,
    popularity: 85,
    image: 'https://via.placeholder.com/400x200?text=Villa',
    user: 'user1',
  },
  {
    id: 2,
    name: 'Modern Apartment',
    location: 'Adama',
    price: 80000,
    rooms: 3,
    size: 180,
    rating: 4.2,
    popularity: 92,
    image: 'https://via.placeholder.com/400x200?text=Apartment',
    user: 'user2',
  },
  {
    id: 3,
    name: 'Country Home',
    location: 'Bahir Dar',
    price: 95000,
    rooms: 5,
    size: 300,
    rating: 4.8,
    popularity: 77,
    image: 'https://via.placeholder.com/400x200?text=Home',
    user: 'user1',
  },
];

const PropertySearch = ({ currentUser = 'user1' }) => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [size, setSize] = useState('');

  const filterAndSortProperties = () => {
    let results = dummyProperties.filter(p => p.user === currentUser);

    if (searchTerm) {
      results = results.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice) results = results.filter(p => p.price >= parseFloat(minPrice));
    if (maxPrice) results = results.filter(p => p.price <= parseFloat(maxPrice));
    if (rooms) results = results.filter(p => p.rooms === parseInt(rooms));
    if (size) results = results.filter(p => p.size >= parseFloat(size));

    if (sortBy) {
      results.sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'popularity') return b.popularity - a.popularity;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
    }

    setFilteredProperties(results);
  };

  // Run filtering whenever inputs change
  useEffect(() => {
    filterAndSortProperties();
  }, [searchTerm, sortBy, minPrice, maxPrice, rooms, size, currentUser]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Search Your Properties</h2>

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

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-md p-4">
              <img
                src={property.image}
                alt={property.name}
                className="rounded-xl h-40 w-full object-cover mb-2"
              />
              <h3 className="text-xl font-semibold">{property.name}</h3>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="mt-1">💰 ${property.price}</p>
              <p>🛏 {property.rooms} rooms | 📏 {property.size} sqm</p>
              <p>⭐ {property.rating} | 🔥 {property.popularity} views</p>
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
