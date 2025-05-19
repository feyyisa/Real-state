const Feedback = require("../models/Feedback");

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { userId, name, email, message, rating, propertyId, agentId } = req.body;

    // Validate incoming data
    if (!userId || !name || !email || !message || !rating) {
      return res.status(400).json({ error: "All fields (userId, name, email, message, rating) are required." });
    }

    // Create a new feedback
    const feedback = new Feedback({ userId, name, email, message, rating, propertyId, agentId });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all feedback (optionally filter by property or agent)
exports.getAllFeedback = async (req, res) => {
  try {
    const { sortBy = "createdAt", order = "desc", propertyId, agentId, userId } = req.query;
    const sortOrder = order === "asc" ? 1 : -1;
    const filter = {};

    if (propertyId) filter.propertyId = propertyId;
    if (agentId) filter.agentId = agentId;
    if (userId) filter.userId = userId;  // Filter by userId if provided

    const feedbacks = await Feedback.find(filter).sort({ [sortBy]: sortOrder });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

// Get feedback by userId
exports.getFeedbackByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const feedbacks = await Feedback.find({ userId }).sort({ createdAt: -1 });

    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found for this user" });
    }

    res.json(feedbacks);  // Send all feedbacks for the user
  } catch (error) {
    console.error("Error fetching feedback by userId:", error);
    res.status(500).json({ error: "Failed to fetch feedback for user" });
  }
};

// Respond to feedback
exports.respondToFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, respondedBy } = req.body;

    if (!response) {
      return res.status(400).json({ error: "Response is required" });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { response, respondedAt: new Date(), respondedBy },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json({ message: "Response sent", feedback: updatedFeedback });
  } catch (error) {
    console.error("Error responding to feedback:", error);
    res.status(500).json({ error: "Failed to respond to feedback" });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Failed to delete feedback" });
  }
};
