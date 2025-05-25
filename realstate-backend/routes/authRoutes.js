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
  updateUserByAdmin,
  updateUserStatus,
  verifyOwner
} = require('../controllers/authController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (for all authenticated users)
router.get('/profile', protect, getCurrentUser);
router.put('/profile', protect, updateProfile); // Customer updates their own profile
router.get('/me', protect, getUserProfile);

// Admin-only routes
router.get('/', protect, adminOnly, getAllUsers);
router.get('/:id', protect, adminOnly, getUserById);
router.get('/role/:role', protect, adminOnly, getUsersByRole);
router.delete('/:id', protect, adminOnly, deleteUser);
router.put('/admin/:id', protect, adminOnly, updateUserByAdmin);
router.patch('/admin/:id/status', protect, adminOnly, updateUserStatus);
router.patch('/admin/:id/verify', protect, adminOnly, verifyOwner);

// Customer can update their own profile (separate from admin updates)
router.put('/:id', protect, updateUserProfile);

module.exports = router;