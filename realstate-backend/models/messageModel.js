const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    response: { type: String, default: "" },        // Admin's response text
    respondedBy: { type: String, default: "" },     // Admin's name or ID
    respondedAt: { type: Date },                    // Response timestamp
  },
  { timestamps: true }  // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model("Contact", contactSchema);
