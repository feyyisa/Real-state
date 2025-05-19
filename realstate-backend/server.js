const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Add this near the top with other requires
const axios = require('axios');
const Booking = require('./models/Booking');
const Property = require('./models/Property');

// Add this after MongoDB connection but before app.listen()
const checkPendingPayments = async () => {
  try {
    const unpaidBookings = await Booking.find({ 
      paymentStatus: 'unpaid',
      paymentReceipt: { $ne: 'pending' } // Only check those with payment reference
    }).populate('property');

    for (const booking of unpaidBookings) {
      try {
        const response = await axios.get(
          `https://api.chapa.co/v1/transaction/verify/${booking.paymentReceipt}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
            }
          }
        );

        const paymentData = response.data.data;
        if (paymentData.status === 'success') {
          // Update booking status
          await Booking.findByIdAndUpdate(booking._id, {
            paymentStatus: 'paid',
          });

          // Keep property as booked
          await Property.findByIdAndUpdate(
            booking.property._id,
            { status: 'booked' }
          );
        } else {
          // If payment failed, mark booking as failed and make property available
          await Booking.findByIdAndUpdate(booking._id, {
            paymentStatus: 'failed',
            status: 'cancelled'
          });
          
          await Property.findByIdAndUpdate(
            booking.property._id,
            { status: 'available' }
          );
        }
      } catch (error) {
        console.error(`Error verifying payment for booking ${booking._id}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error in payment verification service:', error);
  }
};

// Run every 30 minutes (adjust as needed)
setInterval(checkPendingPayments, 10 * 60 * 1000); 

// Run immediately on startup (optional)
checkPendingPayments();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const messageRoutes = require('./routes/messageRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const feedbackRoute = require('./routes/feedbackRoutes');
const analyticsRoute = require('./routes/analyticsRoute'); 
const bookingRoutes = require('./routes/bookingRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Serve uploaded images statically
app.use('/uploads', express.static(uploadDir));
// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/feedback', feedbackRoute);
app.use('/api/analytics', analyticsRoute); // ✅ Correct
app.use('/api/bookings', bookingRoutes);



// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running fine ✅' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
