// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    size: "",
    minPrice: "",
    maxPrice: "",
    sortBy: ""
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const fetchProperties = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:5000/api/properties?${query}`);
      setProperties(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, );
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleSearch = () => {
    fetchProperties();
  };
  const handleSort = () => {
    fetchProperties();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="relative bg-cover bg-center h-[200px]" style={{ backgroundImage: `url('https://source.unsplash.com/featured/?villa')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-semibold">Find Your Home</h1>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-4 py-6 bg-white rounded shadow mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="location" value={filters.location} onChange={handleFilterChange} placeholder="Location" className="p-2 border rounded" />
          <select name="type" value={filters.type} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="">All Types</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
          <input name="size" value={filters.size} onChange={handleFilterChange} placeholder="Size (e.g. 120 sqm)" className="p-2 border rounded" />
          <input name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min Price" type="number" className="p-2 border rounded" />
          <input name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max Price" type="number" className="p-2 border rounded" />
        </div>

        {/* Search and Sort Buttons */}
        <div className="mt-4 flex justify-between">
          <button onClick={handleSearch} className="bg-blue-500 text-white px-6 py-2 rounded">Search</button>
          <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <button onClick={handleSort} className="bg-green-500 text-white px-6 py-2 rounded">Sort</button>
        </div>
      </div>

      {/* Property Listings */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Featured Properties</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={`http://localhost:5000/uploads/${property.image}`} alt={property.location} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{property.location}</h3>
                <p className="text-blue-600 font-semibold">{property.price} br</p>
                <button onClick={() => setSelectedProperty(property)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">View</button>
              </div>
            </div>
          ))}
        </div>
        {selectedProperty && (
          <div className="mt-12 bg-white shadow p-6 rounded">
            <h3 className="text-2xl font-bold">{selectedProperty.location}</h3>
            <img src={`http://localhost:5000/uploads/${selectedProperty.image}`} alt={selectedProperty.location} className="w-full h-64 object-cover my-4" />
            <p className="font-semibold">Price: {selectedProperty.price} br</p>
            <p>Type: {selectedProperty.type}</p>
            <p>Size: {selectedProperty.size}</p>
            <p>Status: {selectedProperty.status}</p>
            <button onClick={() => setSelectedProperty(null)} className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Close</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
