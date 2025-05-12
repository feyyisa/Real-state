const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

// Static analytics routes
router.get("/price-trends", analyticsController.priceTrends);
router.get("/price-by-location", analyticsController.priceByLocation);
router.get("/popular-property-types", analyticsController.popularPropertyTypes);
router.get("/listings-by-location", analyticsController.listingsByLocation);

// Dynamic analytics per owner
router.get("/:ownerId", analyticsController.getOwnerAnalytics);

module.exports = router;
