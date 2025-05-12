const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { getOwners } = require('../controllers/authController');
const { authenticateUser: protect } = require('../middleware/authMiddleware'); // assuming 'protect' is the same

// Routes
router.get('/profile', protect, authController.getUserProfile);
router.put('/update', protect, authController.updateUserProfile);

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/me', protect, authController.getCurrentUser);
router.get('/', authController.getAllUsers);
router.get('/role/owner', getOwners); 
router.get('/:id', authController.getUserById);
router.get('/role/:role', authController.getUsersByRole);
router.put('/:id', authController.updateUser);
router.delete('/:id', authController.deleteUser);
// Backend route for fetching owners



module.exports = router;
