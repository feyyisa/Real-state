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
const paymentVerificationService = require('./services/paymentVerificationService');
paymentVerificationService.start();


// Handle graceful shutdown
process.on('SIGTERM', () => {
  paymentVerificationService.stop();
  process.exit();
});

process.on('SIGINT', () => {
  paymentVerificationService.stop();
  process.exit();
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const messageRoutes = require('./routes/messageRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const feedbackRoute = require('./routes/feedbackRoutes');
const analyticsRoute = require('./routes/analyticsRoute'); 
const bookingRoutes = require('./routes/bookingRoutes');
const geminiRoutes = require('./routes/geminiRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

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
app.use('/api/gemini', geminiRoutes);
app.use('/api/announcements', announcementRoutes);


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
