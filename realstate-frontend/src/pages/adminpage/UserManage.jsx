import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });
  const [editUser, setEditUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, role } = newUser;
    if (!name || !email || !phone || !password || !role) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User added successfully!");
      setUsers([...users, res.data.user]);
      setNewUser({ name: "", email: "", phone: "", password: "", role: "" });
    } catch (err) {
      console.error("Error adding user:", err);
      alert(err.response?.data?.message || "Failed to add user.");
    }
  };

  const handleSaveEdit = async () => {
    if (!editUser) return;

    const { _id, name, email, phone, role, password } = editUser;
    if (!name || !email || !phone || !role) {
      alert("All fields except password are required.");
      return;
    }
    const updatedData = { name, email, phone, role };
    if (password?.trim()) updatedData.password = password;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/admin/${_id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data) {
        const updatedUsers = users.map((user) =>
          user._id === _id ? res.data : user
        );
        setUsers(updatedUsers);
        setEditUser(null);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert(err.response?.data?.message || "Failed to update user.");
    }
  };

  const handleRemoveUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.response?.data?.message || "Failed to delete user.");
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/auth/admin/${userId}/status`,
        { isActive: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isActive: res.data.isActive } : user
      ));
    } catch (err) {
      console.error("Error updating user status:", err);
      alert(err.response?.data?.message || "Failed to update user status.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <form onSubmit={handleAddUser} className="space-y-2 bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold">Add New User</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input type="text" placeholder="Name" value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 border rounded" />
          <input type="email" placeholder="Email" value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 border rounded" />
          <input type="text" placeholder="Phone" value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="p-2 border rounded" />
          <input type="password" placeholder="Password" value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="p-2 border rounded" />
          <select value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border rounded">
            <option value="">Select Role</option>
            <option value="owner">Owner</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-3 rounded hover:bg-blue-700">
          Add User
        </button>
      </form>

      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">User List</h2>
        <table className="w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="border p-2">
                  {editUser?._id === user._id ? (
                    <input value={editUser.name}
                      onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                      className="p-1 border rounded w-full" />
                  ) : user.name}
                </td>
                <td className="border p-2">
                  {editUser?._id === user._id ? (
                    <input value={editUser.email}
                      onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                      className="p-1 border rounded w-full" />
                  ) : user.email}
                </td>
                <td className="border p-2">
                  {editUser?._id === user._id ? (
                    <select value={editUser.role}
                      onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                      className="p-1 border rounded w-full">
                      <option value="owner">Owner</option>
                      <option value="customer">Customer</option>
                    </select>
                  ) : user.role}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => toggleUserStatus(user._id, user.isActive)}
                    className={`px-2 py-1 rounded text-white ${
                      user.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Banned'}
                  </button>
                </td>
                <td className="border p-2 text-center space-x-2">
                  {editUser?._id === user._id ? (
                    <>
                      <input
                        type="password"
                        placeholder="New Password (optional)"
                        value={editUser.password || ""}
                        onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                        className="p-1 border rounded mb-1"
                      />
                      <button onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                        Save
                      </button>
                      <button onClick={() => setEditUser(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditUser(user)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                        Edit
                      </button>
                      <button onClick={() => handleRemoveUser(user._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Delete
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
