import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyManage = () => {
  const [properties, setProperties] = useState([]);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
  });

  // Fetch all properties from backend
  const fetchAllProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties");
      console.log("Fetched properties:", res.data); // Debug log
      setProperties(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`);
      fetchAllProperties();
    } catch (err) {
      console.error("Error deleting property:", err);
    }
  };

  // Handle update submit
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/properties/${editingPropertyId}`,
        editForm
      );
      setEditingPropertyId(null);
      setEditForm({
        title: "",
        description: "",
        price: "",
        location: "",
        size: "",
        bedrooms: "",
        bathrooms: "",
      });
      fetchAllProperties();
    } catch (err) {
      console.error("Error updating property:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Properties</h2>
      {Array.isArray(properties) ? (
        properties.map((property) => (
          <div
            key={property._id}
            className="border rounded p-4 mb-4 shadow-md"
          >
            {editingPropertyId === property._id ? (
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="border p-2 mr-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="border p-2 mr-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="border p-2 mr-2"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className="border p-2 mr-2"
                />
                <input
                  type="text"
                  placeholder="Size"
                  value={editForm.size}
                  onChange={(e) =>
                    setEditForm({ ...editForm, size: e.target.value })
                  }
                  className="border p-2 mr-2"
                />
                <input
                  type="number"
                  placeholder="Bedrooms"
                  value={editForm.bedrooms}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bedrooms: e.target.value })
                  }
                  className="border p-2 mr-2"
                />
                <input
                  type="number"
                  placeholder="Bathrooms"
                  value={editForm.bathrooms}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bathrooms: e.target.value })
                  }
                  className="border p-2 mr-2"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold">{property.title}</h3>
                <p>{property.description}</p>
                <p className="text-gray-600">${property.price}</p>
                <p className="text-gray-600">
                  Location:{" "}
                  {property.location
                    ? `${property.location.address}, ${property.location.city}`
                    : "No location provided"}
                </p>
                <p className="text-gray-600">Size: {property.size}</p>
                <p className="text-gray-600">Bedrooms: {property.bedrooms}</p>
                <p className="text-gray-600">Bathrooms: {property.bathrooms}</p>
                <button
                  onClick={() => {
                    setEditingPropertyId(property._id);
                    setEditForm({
                      title: property.title,
                      description: property.description,
                      price: property.price,
                      location: property.location || "",
                      size: property.size || "",
                      bedrooms: property.bedrooms || "",
                      bathrooms: property.bathrooms || "",
                    });
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(property._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default PropertyManage;
