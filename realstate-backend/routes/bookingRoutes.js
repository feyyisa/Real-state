const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  book,
  getAllBookings,
  getBookingById,
  getBookingsByPropertyId,
  getBookingsByOwnerId,
  getBookingsByUserId,
  getBookingsByDate,
  getBookingsByStatus,
  getBookingsByPaymentStatus,
  getBookingsByType,
  paymentCallback,
  updateBookingStatus
} = require('../controllers/bookingController');

// Multer Setup for File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});
router.post('/bookings/payment-callback', paymentCallback);
// Create a booking
router.post('/book', upload.single('bookerIdCardFile'), book);

// Get all bookings
router.get('/', getAllBookings);

// Get bookings by property ID
router.get('/property/:propertyId', getBookingsByPropertyId);

// Get bookings by owner ID
router.get('/owner/:ownerId', getBookingsByOwnerId);

// Get bookings by user ID
router.get('/user/:userId', getBookingsByUserId);

// Get bookings by booking date
router.get('/date/:date', getBookingsByDate);

// Get bookings by status
router.get('/status/:status', getBookingsByStatus);

// Get bookings by payment status
router.get('/payment-status/:paymentStatus', getBookingsByPaymentStatus);

// Get bookings by type (rent/sell)
router.get('/type/:type', getBookingsByType);


router.put('/:bookingId/status', updateBookingStatus);
// Get booking by booking ID
router.get('/:bookingId', getBookingById);

module.exports = router;