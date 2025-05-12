const Feedback = require("../models/Feedback");

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all feedbacks (optional sorting)
exports.getAllFeedback = async (req, res) => {
  try {
    const { sortBy = "createdAt", order = "desc" } = req.query;
    const sortOrder = order === "asc" ? 1 : -1;
    const feedbacks = await Feedback.find().sort({ [sortBy]: sortOrder });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
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

// Get feedbacks by email
exports.getFeedbackByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const feedbacks = await Feedback.find({ email }).sort({ createdAt: -1 });
    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found for this user" });
    }

    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback by email:", error);
    res.status(500).json({ error: "Failed to fetch feedback for user" });
  }
};
