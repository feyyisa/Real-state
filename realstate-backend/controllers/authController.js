const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");

const JWT_SECRET = process.env.JWT_SECRET || '12hsgehfvsdr78438rgbskjbfew7ry';

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !phone || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword, phone, role });
  const savedUser = await newUser.save();

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      phone: savedUser.phone,
      role: savedUser.role,
    },
  });
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

// Get current authenticated user
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ success: true, user });
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
});

// Get users by role
const getUsersByRole = asyncHandler(async (req, res) => {
  const users = await User.find({ role: req.params.role }).select('-password');
  res.status(200).json(users);
});

// Update current authenticated user's profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (password && password.trim() !== "") {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  await user.save();
  res.status(200).json({ message: "User profile updated successfully" });
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User deleted successfully' });
});

// Alternative get current user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

// Alternative update profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { name, email, phone, password } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.status(200).json({
    message: 'Profile updated successfully',
    user: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
    },
  });
});

// ✅ FIXED: updateUser - for admin to edit any user
const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  getUsersByRole,
  updateUserProfile,
  deleteUser,
  getUserProfile,
  updateProfile,
  updateUser, // ✅ This is now properly defined above
};
