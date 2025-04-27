import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageOwners = () => {
  const [owners, setOwners] = useState([]);
  const [newOwner, setNewOwner] = useState({ name: "", email: "", properties: 0 });
  const [editOwner, setEditOwner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchOwners = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/owners");
      setOwners(res.data);
    } catch (err) {
      setError("Failed to fetch owners.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (editOwner) {
      setEditOwner({ ...editOwner, [field]: value });
    } else {
      setNewOwner({ ...newOwner, [field]: value });
    }
  };

  const handleAddOwner = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/owners", newOwner);
      setOwners([...owners, res.data]);
      setNewOwner({ name: "", email: "", properties: 0 });
      setSuccess("Owner added successfully!");
    } catch (err) {
      setError("Failed to add owner.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOwner = (owner) => {
    setEditOwner({ ...owner });
    setError("");
    setSuccess("");
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:5000/api/owners/${editOwner._id}`, editOwner);
      setOwners(owners.map(o => (o._id === editOwner._id ? res.data : o)));
      setSuccess("Owner updated successfully!");
      setEditOwner(null);
    } catch (err) {
      setError("Failed to update owner.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveOwner = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/owners/${id}`);
      setOwners(owners.filter(o => o._id !== id));
      setSuccess("Owner removed successfully!");
    } catch (err) {
      setError("Failed to remove owner.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Owners</h1>
      <p className="mb-6 text-gray-600">Here you can add, edit, or remove property owners.</p>

      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">{error}</div>}
      {success && <div className="p-3 mb-4 text-green-700 bg-green-100 rounded-md">{success}</div>}

      {/* Add Owner Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Owner</h2>
        <form onSubmit={handleAddOwner} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Owner Name"
                value={newOwner.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="owner@example.com"
                value={newOwner.email}
                onChange={(e) => handleInputChange(e, "email")}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="Number"
                placeholder="Owner Number"
                value={newOwner.number}
                onChange={(e) => handleInputChange(e, "number")}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="Password"
                placeholder="Owner Password"
                value={newOwner.password}
                onChange={(e) => handleInputChange(e, "password")}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Properties</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={newOwner.properties}
                onChange={(e) => handleInputChange(e, "properties")}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Adding..." : "Add Owner"}
          </button>
        </form>
      </div>

      {/* Owners Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Owners List</h2>
          <button
            onClick={fetchOwners}
            disabled={loading}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Refresh
          </button>
        </div>

        {loading && owners.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Loading owners...</div>
        ) : owners.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No owners found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Password</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Properties</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {owners.map((owner) => (
                  <tr key={owner._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editOwner?._id === owner._id ? (
                        <input
                          type="text"
                          value={editOwner.name}
                          onChange={(e) => handleInputChange(e, "name")}
                          className="w-full p-1 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">{owner.name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editOwner?._id === owner._id ? (
                        <input
                          type="email"
                          value={editOwner.email}
                          onChange={(e) => handleInputChange(e, "email")}
                          className="w-full p-1 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <div className="text-sm text-gray-500">{owner.email}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editOwner?._id === owner._id ? (
                        <input
                          type="Number"
                          value={editOwner.number}
                          onChange={(e) => handleInputChange(e, "number")}
                          className="w-full p-1 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <div className="text-sm text-gray-500">{owner.number}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editOwner?._id === owner._id ? (
                        <input
                          type="Password"
                          value={editOwner.password}
                          onChange={(e) => handleInputChange(e, "password")}
                          className="w-full p-1 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <div className="text-sm text-gray-500">{owner.password}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editOwner?._id === owner._id ? (
                        <input
                          type="number"
                          value={editOwner.properties}
                          min="0"
                          onChange={(e) => handleInputChange(e, "properties")}
                          className="w-full p-1 border border-gray-300 rounded-md"
                          required
                        />
                      ) : (
                        <div className="text-sm text-gray-500">{owner.properties}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editOwner?._id === owner._id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSaveEdit}
                            disabled={loading}
                            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
                          >
                            {loading ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={() => setEditOwner(null)}
                            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditOwner(owner)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemoveOwner(owner._id)}
                            disabled={loading}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOwners;
