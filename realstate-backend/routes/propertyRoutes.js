const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
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
  approveOrRejectProperty,
  getPropertiesByApprovalStatus,
  getPropertiesForCustomer
} = require("../controllers/propertyController");

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Route to create a property
router.post(
  "/",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "bedroomImage", maxCount: 1 },
    { name: "bathroomImage", maxCount: 1 },
    { name: "otherImage", maxCount: 1 },
    { name: "ownershipDocument", maxCount: 1 },
  ]),
  createProperty
);

// Route to get all properties
router.get("/", getAllProperties);

// Route to get properties for customers (only approved and available)
router.get("/customer/properties", getPropertiesForCustomer);
// Route to get properties by owner ID
router.get("/owner/:ownerId", getPropertiesByOwnerId);


// Route to get a property by ID
router.get("/:id", getPropertyById);


// Route to get properties by status (available/booked)
router.get("/status/:status", getPropertiesByStatus);

// Route to get properties by listing type (rent/sell)
router.get("/listing/:listingType", getPropertiesByListingType);

// Route to get properties by number of bedrooms
router.get("/bedrooms/:bedrooms", getPropertiesByBedrooms);

// Route to get properties by number of bathrooms
router.get("/bathrooms/:bathrooms", getPropertiesByBathrooms);

// Route to get properties by approval status (pending/approved/rejected)
router.get("/approval-status/:approvalStatus", getPropertiesByApprovalStatus); // New route added

// Route to update a property
router.put(
  "/:id",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "bedroomImage", maxCount: 1 },
    { name: "bathroomImage", maxCount: 1 },
    { name: "otherImage", maxCount: 1 },
    { name: "ownershipDocument", maxCount: 1 },
  ]),
  updatePropertyById
);

// Route to approve or reject a property
router.put("/approve-reject/:id", approveOrRejectProperty);

// Route to delete a property
router.delete("/:id", deletePropertyById);

module.exports = router;