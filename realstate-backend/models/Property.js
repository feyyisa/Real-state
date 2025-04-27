const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['rent', 'sell'], required: true },
  size: { type: String, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' },
  image: { type: String, default: null },

  // NEW: Add these 3 fields for ratings
  averageRating: { type: Number, default: 0 },  // Average rating (1-5)
  ratingCount: { type: Number, default: 0 },    // Total number of ratings
  feedbacks: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who gave feedback
    rating: { type: Number, min: 1, max: 5 },                   // Rating (1-5 stars)
    comment: { type: String },                                   // Optional text feedback
    createdAt: { type: Date, default: Date.now }                 // When feedback was given
  }]
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);