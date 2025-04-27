const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" }, // Optional (if rating a property)
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" }, // Optional (if rating an agent)
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

// Auto-update average rating for Property/Agent when feedback is saved
feedbackSchema.post("save", async function (doc) {
  await calculateAverageRating(doc);
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Helper function to update average rating
async function calculateAverageRating(feedback) {
  const Model = feedback.property ? "Property" : "Agent";
  const modelId = feedback.property || feedback.agent;

  const stats = await Feedback.aggregate([
    { $match: { [Model.toLowerCase()]: modelId } },
    { $group: { _id: `$${Model.toLowerCase()}`, avgRating: { $avg: "$rating" } } }
  ]);

  await mongoose.model(Model).findByIdAndUpdate(modelId, {
    averageRating: stats[0]?.avgRating || 0,
    ratingCount: await Feedback.countDocuments({ [Model.toLowerCase()]: modelId })
  });
}

module.exports = Feedback;