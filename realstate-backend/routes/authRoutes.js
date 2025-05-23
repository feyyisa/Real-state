// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  getUsersByRole,
  updateUserProfile,
  deleteUser,
  updateProfile,
  getUserProfile,
  updateUser
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // middleware to protect routes

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getCurrentUser); // current authenticated user
router.put('/profile', protect, updateProfile); // update current user
router.get('/me', protect, getUserProfile); // optional: another current user profile route

// Admin or Protected Routes (adjust permissions in middleware if needed)
router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserById);
router.get('/role/:role', protect, getUsersByRole);
router.put('/:id', protect, updateUserProfile);
router.delete('/:id', protect, deleteUser);
router.put('/:id,', protect, updateUser);



module.exports = router;
