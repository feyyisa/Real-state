const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const { protect } = require("../middleware/authMiddleware");

// Submit feedback (for property or agent)
router.post("/", protect, async (req, res) => {
  const { propertyId, agentId, rating, comment } = req.body;

  try {
    const feedback = await Feedback.create({
      user: req.user.id,
      property: propertyId,
      agent: agentId,
      rating,
      comment
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: "Failed to submit feedback" });
  }
});

// Get all feedback for a property/agent
router.get("/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  const filter = { [type]: id };

  try {
    const feedbacks = await Feedback.find(filter).populate("user", "name email");
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
});

module.exports = router;