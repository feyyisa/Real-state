const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  response: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  respondedAt: Date,
  respondedBy: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
