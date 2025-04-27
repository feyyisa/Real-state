const Property = require('../models/Property');
const User = require('../models/User');

exports.createProperty = async (req, res) => {
  try {
    const { owner, location, price, type, size, status } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!owner || !location || !price || !type || !size) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Optional: Validate owner exists (disable if not needed)
    // const existingOwner = await User.findById(owner);
    // if (!existingOwner) {
    //   return res.status(400).json({ message: "Owner not found" });
    // }

    const newProperty = new Property({
      owner,
      location,
      price,
      type,
      size,
      status: status || 'available',
      image,
    });

    await newProperty.save();

    res.status(201).json({ message: "Property added", property: newProperty });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("owner");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error: error.message });
  }
};
