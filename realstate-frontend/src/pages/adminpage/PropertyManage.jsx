import React, { useState } from "react";

const ManageProperty = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    status: "available",
  });

  // Add a New Property (Frontend Only)
  const addProperty = () => {
    if (!newProperty.title || !newProperty.price || !newProperty.location) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEntry = {
      id: Date.now(), // Unique ID
      ...newProperty,
    };

    setProperties([...properties, newEntry]);
    setNewProperty({
      title: "",
      description: "",
      price: "",
      location: "",
      status: "available",
    });
  };

  // Delete a Property (Frontend Only)
  const deleteProperty = (id) => {
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Properties</h1>
      <p>Here you can manage properties for sale or rent (without backend).</p>

      {/* Add New Property Form */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold">Add New Property</h2>
        <input
          type="text"
          placeholder="Title"
          className="block w-full p-2 mb-2 border rounded"
          value={newProperty.title}
          onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="block w-full p-2 mb-2 border rounded"
          value={newProperty.description}
          onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="block w-full p-2 mb-2 border rounded"
          value={newProperty.price}
          onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="block w-full p-2 mb-2 border rounded"
          value={newProperty.location}
          onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={addProperty}
        >
          Add Property
        </button>
      </div>

      {/* Properties List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Properties List</h2>
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="text-center border-t">
                  <td className="border p-2">{property.title}</td>
                  <td className="border p-2">{property.description}</td>
                  <td className="border p-2">${property.price}</td>
                  <td className="border p-2">{property.location}</td>
                  <td className="border p-2">{property.status}</td>
                  <td className="border p-2">
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => deleteProperty(property.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageProperty;
