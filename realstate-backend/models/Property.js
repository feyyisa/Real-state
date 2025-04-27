const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['rent', 'sell'], required: true },
  size: { type: String, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' },
  image: { type: String, default: null },
  averageRating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  feedbacks: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
