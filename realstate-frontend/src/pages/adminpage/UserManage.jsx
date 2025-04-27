import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users", newUser);
      setUsers([...users, res.data]);
      setNewUser({ name: "", email: "", role: "" });
    } catch (err) {
      alert("Failed to add user.");
      console.log(err);
    }
  };

  const handleEditUser = (user) => {
    setEditUser({ ...user });
  };

  const handleSaveEdit = async () => {
    if (!editUser.name || !editUser.email || !editUser.role) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/users/${editUser._id}`, editUser);
      const updatedUsers = users.map((u) =>
        u._id === editUser._id ? res.data : u
      );
      setUsers(updatedUsers);
      setEditUser(null);
    } catch (err) {
      alert("Update failed.");
      console.log(err);
    }
  };

  const handleRemoveUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert("Delete failed.");
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <p className="mb-4">Add, edit, or remove users from the system.</p>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="owner">owner</option>
            <option value="customer">customer</option>
          </select>
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">User List</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border-t">
                <td className="border p-2">
                  {editUser?._id === user._id ? (
                    <input
                      type="text"
                      value={editUser.name}
                      onChange={(e) =>
                        setEditUser({ ...editUser, name: e.target.value })
                      }
                      className="p-1 border rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border p-2">
                  {editUser?._id === user._id ? (
                    <input
                      type="email"
                      value={editUser.email}
                      onChange={(e) =>
                        setEditUser({ ...editUser, email: e.target.value })
                      }
                      className="p-1 border rounded"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border p-2">
                  {editUser?._id === user._id ? (
                    <select
                      value={editUser.role}
                      onChange={(e) =>
                        setEditUser({ ...editUser, role: e.target.value })
                      }
                      className="p-1 border rounded"
                    >
                      <option value="Admin">Admin</option>
                      <option value="owner">owner</option>
                      <option value="customer">customer</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  {editUser?._id === user._id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditUser(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveUser(user._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
