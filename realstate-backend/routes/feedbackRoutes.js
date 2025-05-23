const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getPropertyFeedback,
  getAverageRating
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

// Middleware to validate feedback input
const validateFeedbackInput = (req, res, next) => {
  const { propertyId, rating, comment } = req.body;

  if (!propertyId || !rating || !comment) {
    return res.status(400).json({
      success: false,
      error: 'Please provide propertyId, rating, and comment'
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      error: 'Rating must be between 1 and 5'
    });
  }

  next();
};

// 🌟 Submit feedback
router.post('/', protect, validateFeedbackInput, submitFeedback);

// 📥 Get all feedback for a property
router.get('/property/:propertyId', getPropertyFeedback);

// ⭐ Get average rating for a property
router.get('/property/:propertyId/average', getAverageRating);

module.exports = router;
