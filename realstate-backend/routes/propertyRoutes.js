const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const propertyController = require('../controllers/propertyController');

const {
  createProperty,
  getAllProperties,
  getPropertyById,
  getPropertiesByOwnerId,
  getPropertiesByStatus,
  getPropertiesByListingType,
  getPropertiesByBedrooms,
  getPropertiesByBathrooms,
  updatePropertyById,
  deletePropertyById,
} = require("../controllers/propertyController");

// Multer config for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
router.post('/api/properties', upload.single('image'), propertyController.createProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.get("/owner/:ownerId", getPropertiesByOwnerId);
router.get("/status/:status", getPropertiesByStatus);
router.get("/listing/:listingType", getPropertiesByListingType);
router.get("/bedrooms/:bedrooms", getPropertiesByBedrooms);
router.get("/bathrooms/:bathrooms", getPropertiesByBathrooms);
router.put("/:id", upload.single("image"), updatePropertyById);
router.delete("/:id", deletePropertyById);

module.exports = router;
