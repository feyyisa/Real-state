const axios = require('axios');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');

const book = async (req, res) => {
  let savedBooking;
  
  try {
    // Get and validate request data
    const { property, type, totalPrice, bookedBy } = req.body;
    const bookerIdCardFile = req.file;

    if (!property || !type || !totalPrice || !bookedBy || !bookerIdCardFile) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Verify authorization
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authorization token required' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== bookedBy) {
      return res.status(403).json({ message: 'Not authorized for this booking' });
    }

    // Check property availability
    const propertyDoc = await Property.findById(property);
    if (!propertyDoc) return res.status(404).json({ message: 'Property not found' });
    if (propertyDoc.status !== 'available') {
      return res.status(400).json({ message: 'Property is not available' });
    }

    // Get user details
    const user = await User.findById(bookedBy);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate transaction reference
    const tx_ref = `booking-${new mongoose.Types.ObjectId()}-${Date.now()}`;

    // Create booking with transaction reference
    const newBooking = new Booking({
      property,
      type,
      totalPrice,
      bookedBy,
      bookerIdCardFile: bookerIdCardFile.path,
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentReceipt: tx_ref
    });

    savedBooking = await newBooking.save();

    // Mark property as booked immediately
    await Property.findByIdAndUpdate(property, { status: 'booked' });

    // Prepare Chapa payment
    const paymentData = {
      amount: totalPrice,
      currency: 'ETB',
      email: user.email,
      first_name: user.name.split(' ')[0],
      last_name: user.name.split(' ')[1] || '',
      tx_ref: tx_ref, // Use same reference
      callback_url: `${process.env.BASE_URL}/api/bookings/payment-callback`,
      // return_url: `${process.env.FRONTEND_URL}/booking-confirmation/${savedBooking._id}`,
      "customization[title]": "Property Booking",
      "customization[description]": `Booking for ${propertyDoc.title}`,
      meta: {
        booking_id: savedBooking._id.toString()
      }
    };

    // Initiate payment
    const chapaResponse = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    res.status(201).json({ 
      message: 'Payment initiated', 
      paymentUrl: chapaResponse.data.data.checkout_url,
      booking: savedBooking
    });

  } catch (error) {
    // Rollback changes if any error occurs
    if (savedBooking) {
      await Booking.findByIdAndDelete(savedBooking._id);
      await Property.findByIdAndUpdate(req.body.property, { status: 'available' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    res.status(500).json({ 
      message: 'Booking failed',
      error: error.message
    });
  }
};

// Payment callback handler - now only updates payment status
const paymentCallback = async (req, res) => {
  try {
    const { tx_ref, status } = req.body;
    
    const update = { 
      paymentStatus: status === 'success' ? 'paid' : 'failed',
      status: status === 'success' ? 'confirmed' : 'cancelled'
    };

    const updatedBooking = await Booking.findOneAndUpdate(
      { paymentReceipt: tx_ref },
      update,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // If payment failed, make property available again
    if (status !== 'success') {
      await Property.findByIdAndUpdate(
        updatedBooking.property,
        { status: 'available' }
      );
    }

    res.status(200).json({ message: 'Payment status updated' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error processing payment callback',
      error: error.message 
    });
  }
};


// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("property")
      .populate("bookedBy", "name email");

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
    const booking = await Booking.findById(bookingId)
      .populate("property")
      .populate("bookedBy", "name email");

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
    const bookings = await Booking.find({ property: propertyId })
      .populate("property")
      .populate("bookedBy", "name email");

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
    
    // First find all properties owned by this user
    const properties = await Property.find({ owner: ownerId });
    const propertyIds = properties.map(p => p._id);
    
    // Then find bookings for these properties with full population
    const bookings = await Booking.find({ property: { $in: propertyIds } })
      .populate({
        path: 'property',
        populate: {
          path: 'owner',
          select: 'name email phone role createdAt'
        }
      })
      .populate({
        path: 'bookedBy',
        select: 'name email phone role createdAt'
      })
      .sort({ createdAt: -1 });

    if (bookings.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No bookings found for this owner' 
      });
    }

    // Format the response with all needed information
    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      property: {
        id: booking.property?._id,
        title: booking.property?.title,
        description: booking.property?.description,
        listingType: booking.property?.listingType,
        price: booking.property?.price,
        status: booking.property?.status,
        location: booking.property?.location,
        amenities: booking.property?.amenities,
        owner: {
          id: booking.property?.owner?._id,
          name: booking.property?.owner?.name,
          email: booking.property?.owner?.email,
          phone: booking.property?.owner?.phone,
          role: booking.property?.owner?.role,
          createdAt: booking.property?.owner?.createdAt
        },
        createdAt: booking.property?.createdAt
      },
      bookedBy: {
        id: booking.bookedBy?._id,
        name: booking.bookedBy?.name,
        email: booking.bookedBy?.email,
        phone: booking.bookedBy?.phone,
        role: booking.bookedBy?.role,
        createdAt: booking.bookedBy?.createdAt
      },
      bookingDetails: {
        type: booking.type,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        totalPrice: booking.totalPrice,
        paymentReceipt: booking.paymentReceipt,
        bookerIdCardFile: booking.bookerIdCardFile,
        bookingDate: booking.bookingDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }
    }));

    res.status(200).json({
      success: true,
      count: formattedBookings.length,
      data: formattedBookings
    });

  } catch (error) {
    console.error('Error fetching bookings by owner ID:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching bookings by owner ID',
      error: error.message 
    });
  }
};

// Get bookings by user ID
const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const bookings = await Booking.find({ bookedBy: userId })
      .populate({
        path: 'property',
        populate: {
          path: 'owner',
          select: 'name email phone role createdAt' // Include all owner details
        }
      })
      .populate({
        path: 'bookedBy',
        select: 'name email phone role createdAt' // Include all user details
      })
      .sort({ createdAt: -1 }); // Sort by newest first

    if (bookings.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No bookings found for this user' 
      });
    }

    // Format the response with all needed information
    const formattedBookings = bookings.map(booking => ({
      id: booking._id,
      property: {
        id: booking.property?._id,
        title: booking.property?.title,
        description: booking.property?.description,
        listingType: booking.property?.listingType,
        price: booking.property?.price,
        status: booking.property?.status,
        location: booking.property?.location,
        amenities: booking.property?.amenities,
        owner: {
          id: booking.property?.owner?._id,
          name: booking.property?.owner?.name,
          email: booking.property?.owner?.email,
          phone: booking.property?.owner?.phone,
          role: booking.property?.owner?.role,
          createdAt: booking.property?.owner?.createdAt
        },
        createdAt: booking.property?.createdAt
      },
      bookedBy: {
        id: booking.bookedBy?._id,
        name: booking.bookedBy?.name,
        email: booking.bookedBy?.email,
        phone: booking.bookedBy?.phone,
        role: booking.bookedBy?.role,
        createdAt: booking.bookedBy?.createdAt
      },
      bookingDetails: {
        type: booking.type,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        totalPrice: booking.totalPrice,
        paymentReceipt: booking.paymentReceipt,
        bookerIdCardFile: booking.bookerIdCardFile,
        bookingDate: booking.bookingDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }
    }));

    res.status(200).json({
      success: true,
      count: formattedBookings.length,
      data: formattedBookings
    });

  } catch (error) {
    console.error('Error fetching bookings by user ID:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching bookings by user ID',
      error: error.message 
    });
  }
};

// Get bookings by status
const getBookingsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const bookings = await Booking.find({ status })
      .populate("property")
      .populate("bookedBy", "name email");

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
    const bookings = await Booking.find({ paymentStatus })
      .populate("property")
      .populate("bookedBy", "name email");

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
    const bookings = await Booking.find({ type })
      .populate("property")
      .populate("bookedBy", "name email");

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
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const bookings = await Booking.find({
      bookingDate: { 
        $gte: startDate,
        $lt: endDate
      }
    })
    .populate("property")
    .populate("bookedBy", "name email");

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this date' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by date:', error);
    res.status(500).json({ message: 'Error fetching bookings by date', error: error.message });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    // Define valid statuses
    const validStatuses = ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    // Fetch booking with related data
    const booking = await Booking.findById(bookingId)
      .populate('property')
      .populate('bookedBy');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Prevent modifications on completed bookings
    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Completed bookings cannot be modified',
      });
    }

    // Prevent invalid backward transitions:
    // e.g. from confirmed -> pending or rejected after completed
    if (booking.status === 'rejected' && status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Rejected bookings can only be reset to pending',
      });
    }

    // Handle specific status transitions
    if (status === 'rejected' || status === 'cancelled') {
      // Can only reject/cancel if not confirmed or completed
      if (booking.status === 'confirmed' || booking.status === 'completed') {
        return res.status(400).json({
          success: false,
          message: 'Cannot cancel or reject a confirmed or completed booking',
        });
      }

      // Update property status to available
      await Property.findByIdAndUpdate(booking.property._id, { status: 'available' });

      // Optionally refund payment if paid
      if (booking.paymentStatus === 'paid') {
        await Booking.findByIdAndUpdate(bookingId, {
          status,
          paymentStatus: 'refunded', // Adjust if you prefer to keep paid
        });
      } else {
        await Booking.findByIdAndUpdate(bookingId, { status });
      }

    } else if (status === 'confirmed') {
      // Only confirm if currently pending and payment is done
      if (booking.status !== 'pending') {
        return res.status(400).json({
          success: false,
          message: 'Only pending bookings can be confirmed',
        });
      }

      if (booking.paymentStatus !== 'paid') {
        return res.status(400).json({
          success: false,
          message: 'Cannot confirm unpaid booking',
        });
      }

      // Mark property as booked and set availableFrom if rent
      const updateData = { status: 'booked' };

      if (booking.type === 'rent') {
        const newAvailableDate = new Date();
        newAvailableDate.setMonth(newAvailableDate.getMonth() + 1);
        updateData.availableFrom = newAvailableDate;
      }

      await Property.findByIdAndUpdate(booking.property._id, updateData);

      // Update booking status below

    } else if (status === 'completed') {
      // Only confirm completion if booking is confirmed
      if (booking.status !== 'confirmed') {
        return res.status(400).json({
          success: false,
          message: 'Only confirmed bookings can be marked completed',
        });
      }

      // For sales, property might become unavailable permanently
      if (booking.type === 'sell') {
        await Property.findByIdAndUpdate(booking.property._id, { status: 'sold' }); // or 'booked' based on your logic
      } else {
        // For rentals, property becomes available again tomorrow
        const newAvailableDate = new Date();
        newAvailableDate.setDate(newAvailableDate.getDate() + 1);

        await Property.findByIdAndUpdate(booking.property._id, {
          status: 'available',
          availableFrom: newAvailableDate,
        });
      }

      // Update earnings and accepted bookings counters on property
      await Property.findByIdAndUpdate(booking.property._id, {
        $inc: {
          earnings: booking.totalPrice,
          acceptedBookings: 1,
        },
      });

      // Update booking status below
    } else if (status === 'pending') {
      // Allow resetting to pending only from rejected (optional)
      if (booking.status !== 'rejected') {
        return res.status(400).json({
          success: false,
          message: 'Only rejected bookings can be reset to pending',
        });
      }

      // Update property status if needed
      await Property.findByIdAndUpdate(booking.property._id, { status: 'available' });
    }

    // Update booking status finally
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        id: updatedBooking._id,
        property: {
          id: booking.property._id,
          title: booking.property.title,
          status: status === 'rejected' || status === 'cancelled' || status === 'pending'
            ? 'available'
            : status === 'confirmed' || status === 'completed'
            ? 'booked'
            : booking.property.status,
        },
        bookedBy: {
          id: booking.bookedBy._id,
          name: booking.bookedBy.name,
        },
        bookingDetails: {
          status: updatedBooking.status,
          paymentStatus: updatedBooking.paymentStatus,
          type: booking.type,
          totalPrice: booking.totalPrice,
          updatedAt: updatedBooking.updatedAt,
        },
      },
    });

  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message,
    });
  }
};


module.exports = {
  book,
  paymentCallback,
  getAllBookings,
  getBookingById,
  getBookingsByPropertyId,
  getBookingsByOwnerId,
  getBookingsByUserId,
  getBookingsByStatus,
  getBookingsByPaymentStatus,
  getBookingsByType,
  getBookingsByDate,
  updateBookingStatus
};