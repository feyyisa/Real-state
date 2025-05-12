const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Path to your multer upload config
const Property = require('../models/Property');

// POST route to add a new property
router.post('/add-property', upload.single('propertyImage'), async (req, res) => {
  try {
    // Validate the request body
    const { title, description, location, price, features, availability, type, size, rooms } = req.body;

    if (!title || !description || !location || !price || !features || !availability || !type || !size || !rooms) {
      return res.status(400).send({ message: 'All fields are required.' });
    }

    // Create a new property
    const property = new Property({
      title,
      description,
      location,
      price,
      features,
      availability,
      type,
      size,
      rooms,
      image: req.file ? req.file.filename : '', // Save the filename if an image is uploaded
    });

    // Save the property to the database
    await property.save();
    
    // Respond with the saved property
    res.status(201).send({ message: 'Property added successfully', property });
  } catch (err) {
    // Handle errors (e.g., database or upload errors)
    console.error('Error adding property:', err);
    res.status(500).send({ message: 'Failed to add property', error: err.message });
  }
});

module.exports = router;
