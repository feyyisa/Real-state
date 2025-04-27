const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userManageRoutes = require('./routes/usermanageroute');
const ownerManageRoutes = require('./routes/ownermanageroute');
const propertyRoutes = require('./routes/propertyRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
//const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ensure 'uploads' folder exists (for images)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded images statically
app.use('/uploads', express.static(uploadDir));

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running fine ✅',
  });
});

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userManageRoutes);
app.use('/api/owners', ownerManageRoutes);
app.use('/api/properties', propertyRoutes); // Property routes including image upload
app.use('/api/contact', contactRoutes);
app.use('/api/payments', paymentRoutes);
//app.use("/api/feedback", feedbackRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {

})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
