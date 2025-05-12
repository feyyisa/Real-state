// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getContactMessages
} = require('../controllers/messageController');
const { validateContactSubmission } = require('../middleware/validateContact');

// POST /api/contact - Submit contact form
router.post('/', validateContactSubmission, submitContactForm);

// GET /api/contact - Get contact messages (admin)
router.get('/', getContactMessages);

module.exports = router;