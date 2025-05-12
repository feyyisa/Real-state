const Property = require("../models/Property");
const mongoose = require("mongoose");

// Create Property
const createProperty = async (req, res) => {
  try {
    let {
      title,
      description,
      propertyType,
      listingType,
      price,
      size,
      bedrooms,
      bathrooms,
      location,
      amenities,
      yearBuilt,
      condition,
      status,
      availableFrom,
      features,
      owner, // incoming ownerId
    } = req.body;

    // Check for valid owner
   if (!owner || !mongoose.Types.ObjectId.isValid(owner)) {

      return res.status(400).json({ message: "Valid owner ID is required." });
    }

    // Parse complex fields if sent as JSON strings
    if (typeof location === "string") location = JSON.parse(location);
    if (typeof amenities === "string") amenities = JSON.parse(amenities);
    if (typeof features === "string") features = JSON.parse(features);

    // Handle image upload
    const image = req.file?.filename;

    const newProperty = new Property({
      title,
      description,
      propertyType,
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
      image,
      owner,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property created successfully", property: newProperty });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Internal server error", error });
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

// Get properties by status
const getPropertiesByStatus = async (req, res) => {
  try {
    const properties = await Property.find({ status: req.params.status });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties by status", error });
  }
};

// Get properties by listing type
const getPropertiesByListingType = async (req, res) => {
  try {
    const properties = await Property.find({ listingType: req.params.listingType });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties by listing type", error });
  }
};

// Get properties by number of bedrooms
const getPropertiesByBedrooms = async (req, res) => {
  try {
    const properties = await Property.find({ bedrooms: Number(req.params.bedrooms) });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties by bedrooms", error });
  }
};

// Get properties by number of bathrooms
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
    const updatedFields = req.body;

    // Parse if needed
    if (typeof updatedFields.location === "string") updatedFields.location = JSON.parse(updatedFields.location);
    if (typeof updatedFields.amenities === "string") updatedFields.amenities = JSON.parse(updatedFields.amenities);
    if (typeof updatedFields.features === "string") updatedFields.features = JSON.parse(updatedFields.features);

    if (req.file?.filename) {
      updatedFields.image = req.file.filename;
    }

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
};
