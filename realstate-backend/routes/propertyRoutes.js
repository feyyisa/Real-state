const express = require('express');
const multer = require('multer');
const path = require('path');
const propertyController = require('../controllers/propertyController');

const router = express.Router();

// Storage config for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), propertyController.createProperty);
router.get('/', propertyController.getAllProperties);

module.exports = router;
