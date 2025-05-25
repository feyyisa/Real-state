const Feedback = require('../models/Feedback');
const Property = require('../models/Property');
const mongoose = require('mongoose');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
const submitFeedback = async (req, res) => {
  try {
    const { propertyId, rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ success: false, error: 'Invalid property ID' });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    const feedback = await Feedback.create({
      property: propertyId,
      user: req.user._id,
      rating,
      comment
    });

    // Update property's average rating and review count
    await updatePropertyRating(propertyId);

    const populatedFeedback = await Feedback.findById(feedback._id)
      .populate('user', 'name email profilePicture')
      .populate('property', 'title');

    res.status(201).json({ success: true, data: populatedFeedback });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get all feedback for a specific property
// @route   GET /api/feedback/property/:propertyId
// @access  Public
const getPropertyFeedback = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ success: false, error: 'Invalid property ID' });
    }

    const feedbacks = await Feedback.find({ property: propertyId })
      .populate('user', 'name email profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get average rating and review count for a property
// @route   GET /api/feedback/property/:propertyId/average
// @access  Public
const getAverageRating = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ success: false, error: 'Invalid property ID' });
    }

    const stats = await Feedback.aggregate([
      { $match: { property: new mongoose.Types.ObjectId(propertyId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 }
        }
      }
    ]);

    const result = stats[0] || { averageRating: 0, reviewCount: 0 };

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error calculating average rating:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get all feedback for properties owned by the logged-in owner
// @route   GET /api/feedback/owner
// @access  Private
const getOwnerFeedbacks = async (req, res) => {
  try {
    const ownerId = req.user._id;

    // Find all properties owned by this owner
    const properties = await Property.find({ owner: ownerId }).select('_id');
    const propertyIds = properties.map((p) => p._id);

    if (propertyIds.length === 0) {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }

    // Find all feedback for these properties
    const feedbacks = await Feedback.find({ property: { $in: propertyIds } })
      .populate('user', 'name email profilePicture')
      .populate('property', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    console.error('Error fetching owner feedbacks:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// 🔁 Internal: Update average rating and review count on property
const updatePropertyRating = async (propertyId) => {
  try {
    const stats = await Feedback.aggregate([
      { $match: { property: new mongoose.Types.ObjectId(propertyId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 }
        }
      }
    ]);

    if (stats.length > 0) {
      await Property.findByIdAndUpdate(propertyId, {
        averageRating: stats[0].averageRating.toFixed(1), // round to 1 decimal
        reviewCount: stats[0].reviewCount
      });
    }
  } catch (err) {
    console.error('Failed to update property rating:', err);
  }
};

module.exports = {
  submitFeedback,
  getPropertyFeedback,
  getAverageRating,
  getOwnerFeedbacks
};
