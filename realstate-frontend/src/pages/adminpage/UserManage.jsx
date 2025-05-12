import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [token, setToken] = useState(localStorage.getItem("token"));
  const history = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      newUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      alert("User added successfully!");
      setUsers([...users, response.data.user]); // Make sure you access `.user` from response
      setNewUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
    }
  } catch (err) {
    console.error("Error adding user:", err);
    const errorMsg = err.response?.data?.message || "Error adding user. Please try again.";
    alert(errorMsg);
  }
};


  const handleSaveEdit = async () => {
    const { _id, name, email, phone, role } = editUser;

    if (!name || !email || !phone || !role) {
      alert("All fields except password are required.");
      return;
    }

    const updatedData = { name, email, phone, role };

    // Include password only if user added it during edit
    if (editUser.password && editUser.password.trim() !== "") {
      updatedData.password = editUser.password;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/${_id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUsers = users.map((u) => (u._id === _id ? res.data : u));
      setUsers(updatedUsers);
      setEditUser(null);
    } catch (err) {
      alert("Update failed.");
      console.error(err);
    }
  };

  const handleRemoveUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          <input
            type="text"
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Role</option>
            <option value="admin">admin</option>
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
                      onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
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
                      onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
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
                      onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                      className="p-1 border rounded"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Owner">Owner</option>
                      <option value="Customer">Customer</option>
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
                        onClick={() => setEditUser(user)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveUser(user._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
