const fs = require("fs");
const path = require("path");
const Property = require("../models/Property");
const mongoose = require("mongoose");

// Create property
const createProperty = async (req, res) => {
  try {
    let {
      title,
      description,
      listingType,
      price,
      size,
      bedrooms,
      bathrooms,
      yearBuilt,
      condition,
      status,
      availableFrom,
      features,
      amenities,
      location,
      owner
    } = req.body;

    // Validate owner
    if (!owner || !mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ message: "Valid owner ID is required." });
    }

    // Parse JSON fields if sent as strings
    if (typeof location === "string") location = JSON.parse(location);
    if (typeof amenities === "string") amenities = JSON.parse(amenities);
    if (typeof features === "string") features = JSON.parse(features);

    // Extract file uploads
    const profileImage = req.files?.profileImage?.[0]?.filename || null;
    const bedroomImage = req.files?.bedroomImage?.[0]?.filename || null;
    const bathroomImage = req.files?.bathroomImage?.[0]?.filename || null;
    const otherImage = req.files?.otherImage?.[0]?.filename || null;
    const ownershipDocument = req.files?.ownershipDocument?.[0]?.filename || null;

    const newProperty = new Property({
      title,
      description,
      listingType,
      price,
      size,
      bedrooms,
      bathrooms,
      yearBuilt,
      condition,
      status,
      availableFrom,
      features,
      amenities,
      location,
      profileImage,
      bedroomImage,
      bathroomImage,
      otherImage,
      ownershipDocument,
      owner
    });

    await newProperty.save();
    res.status(201).json({ message: "Property created successfully", property: newProperty });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Approve or reject property
const approveOrRejectProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvalStatus, rejectionReason } = req.body;

    if (!["approved", "rejected"].includes(approvalStatus)) {
      return res.status(400).json({ message: "Invalid approval status." });
    }

    const update = { approvalStatus };
    if (approvalStatus === "rejected") {
      if (!rejectionReason) {
        return res.status(400).json({ message: "Rejection reason is required when rejecting a property." });
      }
      update.rejectionReason = rejectionReason;
    } else {
      update.rejectionReason = null;
    }

    const updated = await Property.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ message: `Property ${approvalStatus}`, property: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating approval status", error });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "name email");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties", error });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "name email");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
};

// Get properties by owner ID
const getPropertiesByOwnerId = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.params.ownerId });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties by owner", error });
  }
};

// Get properties by status (available/booked)
const getPropertiesByStatus = async (req, res) => {
  try {
    const properties = await Property.find({ status: req.params.status });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties by status", error });
  }
};

// Get properties by listing type (rent/sell)
const getPropertiesByListingType = async (req, res) => {
  try {
    const properties = await Property.find({ listingType: req.params.listingType });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties by listing type", error });
  }
};

// Get properties by bedrooms
const getPropertiesByBedrooms = async (req, res) => {
  try {
    const properties = await Property.find({ bedrooms: Number(req.params.bedrooms) });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties by bedrooms", error });
  }
};

// Get properties by bathrooms
const getPropertiesByBathrooms = async (req, res) => {
  try {
    const properties = await Property.find({ bathrooms: Number(req.params.bathrooms) });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties by bathrooms", error });
  }
};

// Update property
const updatePropertyById = async (req, res) => {
  try {
    let updatedFields = req.body;

    // Parse fields if they are strings
    if (typeof updatedFields.location === "string") updatedFields.location = JSON.parse(updatedFields.location);
    if (typeof updatedFields.amenities === "string") updatedFields.amenities = JSON.parse(updatedFields.amenities);
    if (typeof updatedFields.features === "string") updatedFields.features = JSON.parse(updatedFields.features);

    // Check for uploaded files and update the fields
    if (req.files?.profileImage) updatedFields.profileImage = req.files.profileImage[0].filename;
    if (req.files?.bedroomImage) updatedFields.bedroomImage = req.files.bedroomImage[0].filename;
    if (req.files?.bathroomImage) updatedFields.bathroomImage = req.files.bathroomImage[0].filename;
    if (req.files?.otherImage) updatedFields.otherImage = req.files.otherImage[0].filename;
    if (req.files?.ownershipDocument) updatedFields.ownershipDocument = req.files.ownershipDocument[0].filename;

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!updatedProperty) return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error });
  }
};

// Delete property
const deletePropertyById = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Property not found" });

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
};

// Get properties by approval status
const getPropertiesByApprovalStatus = async (req, res) => {
  try {
    const { approvalStatus } = req.params; // Extract the approval status from the request params

    const properties = await Property.find({ approvalStatus }); // Find properties with the specified approval status

    if (properties.length === 0) {
      return res.status(404).json({ message: 'No properties found with this approval status' });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties by approval status:', error);
    res.status(500).json({ message: 'Error fetching properties by approval status', error: error.message });
  }
};

// Get properties for customers (only approved and available)
const getPropertiesForCustomer = async (req, res) => {
  try {
    const properties = await Property.find({
      approvalStatus: "approved",
      status: "available"
    }).populate("owner", "name email");

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties for customers:", error);
    res.status(500).json({ message: "Error fetching properties for customers", error: error.message });
  }
};


module.exports = {
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
};