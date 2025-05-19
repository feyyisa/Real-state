const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/", feedbackController.createFeedback);
router.get("/", feedbackController.getAllFeedback);
router.get("/user/:userId", feedbackController.getFeedbackByUserId);  // Fetch feedback by userId
router.put("/:id/respond", feedbackController.respondToFeedback);
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
