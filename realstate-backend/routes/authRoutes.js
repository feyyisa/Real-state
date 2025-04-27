const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path to your model
const {loginUser} = require('../controllers/authController')
const {registerUser} = require('../controllers/authController')
const {getAllUsers} = require('../controllers/authController')
// 👇 Login route
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/users', getAllUsers);
module.exports = router;
