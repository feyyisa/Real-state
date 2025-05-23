const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/analyticsController");
const { protect, authorizeOwner } = require("../middleware/authMiddleware");

// General analytics — handles both admin and owner
router.get("/", protect, getAnalytics);

// ❌ REMOVE or comment this out to avoid error
// router.get("/owner", protect, authorizeOwner, getOwnerAnalytics);

module.exports = router;
