import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageOwners = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch owners along with their properties
  const fetchOwners = async () => {
    try {
      setLoading(true);
      // Use the correct backend endpoint URL
      const res = await axios.get("http://localhost:5000/auth/role/owner");
      setOwners(res.data); // Set owners list with properties data from backend
    } catch (err) {
      setError("Failed to fetch owners.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();  // Fetch owners when component mounts
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Owners</h1>
      <p className="mb-6 text-gray-600">Here you can view the list of property owners and their associated properties.</p>

      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">{error}</div>}

      {/* Owners Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Owners List</h2>
          <button onClick={fetchOwners} disabled={loading} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">
            Refresh
          </button>
        </div>
        {loading && owners.length === 0 ? (
          <p className="text-center text-gray-500">Loading owners...</p>
        ) : owners.length === 0 ? (
          <p className="text-center text-gray-500">No owners found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "Phone", "Properties"].map((head) => (
                  <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {owners.map((owner) => (
                <tr key={owner._id}>
                  {["name", "email", "number"].map((field) => (
                    <td key={field} className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{owner[field]}</span>
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {owner.properties && owner.properties.length > 0 ? (
                        <ul>
                          {owner.properties.map((property, index) => (
                            <li key={index}>{property.title}</li> // Display property title (you can adjust as needed)
                          ))}
                        </ul>
                      ) : (
                        <span>No properties</span>
                      )}
                    </span>
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

export default ManageOwners;
