const express = require('express');
const router = express.Router();
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
  getBookingsByType
} = require('../controllers/bookingController');

// Create a booking
router.post('/book', book);

// Get all bookings
router.get('/', getAllBookings);

// Get booking by booking ID
router.get('/:bookingId', getBookingById);

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

module.exports = router;
