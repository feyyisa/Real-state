const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  respondToFeedback,
  deleteFeedback,
  getFeedbackByEmail,
} = require("../controllers/feedbackController");

router.post("/submit", createFeedback);
router.get("/all", getAllFeedback);
router.put("/respond/:id", respondToFeedback);
router.delete("/delete/:id", deleteFeedback);
router.get("/user/:email", getFeedbackByEmail);


module.exports = router;
