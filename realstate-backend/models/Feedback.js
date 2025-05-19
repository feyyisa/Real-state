const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: null },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', default: null },
  response: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  respondedAt: Date,
  respondedBy: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
