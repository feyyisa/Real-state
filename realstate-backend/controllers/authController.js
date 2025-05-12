const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || '12hsgehfvsdr78438rgbskjbfew7ry';
const asyncHandler = require("express-async-handler");

// Register a new user
exports.registerUser = async (req, res) => {
  console.log('Received data for registration:', req.body);
  try {
    const { name, email, password, phone, role } = req.body;

    // Validate input
    if (!name || !email || !password || !phone || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      propertyCount: role === 'owner' ? 0 : undefined,
    });

    console.log('Saving user...');
    const savedUser = await newUser.save();

    console.log('User registered successfully');
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
  } catch (err) {
    
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
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
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Get current authenticated user
exports.getCurrentUser = async (req, res) => {
  try {
    // Find the user by ID from the decoded JWT token (req.user.id set by middleware)
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Error fetching user profile:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get users by role
exports.getUsersByRole = async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users by role:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Failed to update user", error: err.message });
  }
};
// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

const updateUserProfile = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      const updatedUser = await user.save();
      res.json({ message: "Profile updated", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};
const getOwners = async (req, res) => {
  try {
    const owners = await User.find({ role: 'owner' });
    res.json(owners);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch owners', error: err.message });
  }
};

module.exports = {
  getOwners,
};
// Add to the exports at the bottom
module.exports = {
  registerUser: exports.registerUser,
  loginUser: exports.loginUser,
  getCurrentUser: exports.getCurrentUser,
  getAllUsers: exports.getAllUsers,
  getUserById: exports.getUserById,
  getUsersByRole: exports.getUsersByRole,
  updateUser: exports.updateUserProfile, // Fixed: matches the controller function
  deleteUser: exports.deleteUser,
  getUserProfile,
  updateUserProfile,
  getOwners,
};
