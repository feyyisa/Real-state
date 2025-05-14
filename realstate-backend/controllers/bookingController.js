const Booking = require('../models/Booking');
const Property = require('../models/Property');

// Book a property
const book = async (req, res) => {
  try {
    const { property, type, totalPrice, bookedBy } = req.body;

    // Validate the request body
    if (!property || !type || !totalPrice || !bookedBy) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Prepare file data
    const paymentReceipt = req.files?.paymentReceipt?.[0]?.filename || null;
    const bookerIdCardFile = req.files?.bookerIdCardFile?.[0]?.filename || null;

    // Create a new booking
    const newBooking = new Booking({
      property,
      type,
      totalPrice,
      paymentReceipt,
      bookedBy,
      bookerIdCardFile
    });

    // Save the booking to the database
    await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("property")
      .populate("bookedBy", "name email"); // Populate with user details

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate("property").populate("bookedBy", "name email");

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
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
    console.error('Error fetching bookings by property ID:', error);
    res.status(500).json({ message: 'Error fetching bookings by property ID', error: error.message });
  }
};

// Get bookings by owner ID
const getBookingsByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const bookings = await Booking.find({ "property.owner": ownerId }).populate("property").populate("bookedBy", "name email");

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this owner' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by owner ID:', error);
    res.status(500).json({ message: 'Error fetching bookings by owner ID', error: error.message });
  }
};

// Get bookings by user ID
const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ bookedBy: userId }).populate("property").populate("bookedBy", "name email");

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by user ID:', error);
    res.status(500).json({ message: 'Error fetching bookings by user ID', error: error.message });
  }
};

// Get bookings by status
const getBookingsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const bookings = await Booking.find({ status }).populate("property").populate("bookedBy", "name email");

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this status' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by status:', error);
    res.status(500).json({ message: 'Error fetching bookings by status', error: error.message });
  }
};

// Get bookings by payment status
const getBookingsByPaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.params;
    const bookings = await Booking.find({ paymentStatus }).populate("property").populate("bookedBy", "name email");

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this payment status' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by payment status:', error);
    res.status(500).json({ message: 'Error fetching bookings by payment status', error: error.message });
  }
};

// Get bookings by type (rent/sell)
const getBookingsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const bookings = await Booking.find({ type }).populate("property").populate("bookedBy", "name email");

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this type' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by type:', error);
    res.status(500).json({ message: 'Error fetching bookings by type', error: error.message });
  }
};

// Get bookings by booking date
const getBookingsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const bookings = await Booking.find({
      bookingDate: { $gte: new Date(date) }
    }).populate("property").populate("bookedBy", "name email");

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this date' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by date:', error);
    res.status(500).json({ message: 'Error fetching bookings by date', error: error.message });
  }
};

module.exports = {
  book,
  getAllBookings,
  getBookingById,
  getBookingsByPropertyId,
  getBookingsByOwnerId,
  getBookingsByUserId,
  getBookingsByStatus,
  getBookingsByPaymentStatus,
  getBookingsByType,
  getBookingsByDate
};