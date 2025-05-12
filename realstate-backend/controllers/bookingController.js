const Booking = require('../models/Booking');
const  Properties= require('../models/property');
const {v4: uuidv4}=require("uuid");
const axios= require("axios");
const CHAPA_SECRETE_KEY="CHASECK_TEST-jMXZdWwG2IRD0trOH46hrf1qEpRTcxju"
const book = async (req, res) => {
  try {
    const bookingData = req.body;
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("Properties").populate("users");
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get booking by booking ID
const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching booking by ID', error: error.message });
  }
};

// Get bookings by property ID
const getBookingsByPropertyId = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const bookings = await Booking.find({ property: propertyId });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this property' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings by property ID', error: error.message });
  }
};

// Get bookings by owner ID
const getBookingsByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const bookings = await Booking.find({ owner: ownerId });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this owner' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings by owner ID', error: error.message });
  }
};

// Get bookings by user ID
const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings by user ID', error: error.message });
  }
};

// Get bookings by booking date
const getBookingsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const bookings = await Booking.find({
      bookingDate: { $gte: new Date(date) }
    });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this date' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings by date', error: error.message });
  }
};

// Get bookings by status
const getBookingsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const bookings = await Booking.find({ status });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this status' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings by status', error: error.message });
  }
};

// Get bookings by payment status
const getBookingsByPaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.params;
    const bookings = await Booking.find({ paymentStatus });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this payment status' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings by payment status', error: error.message });
  }
};

// Get bookings by type (rent/sell)
const getBookingsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const bookings = await Booking.find({ type });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this type' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings by type', error: error.message });
  }
};

const tx_ref='tx-${uuidv4()}';




















module.exports = {
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
};