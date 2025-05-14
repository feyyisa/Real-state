const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['rent', 'sell'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentReceipt: {
    type: String,
    required: true
  },
  bookedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  bookerIdCardFile: { 
    type: String,
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.models.Booking || mongoose.model("Bookings", bookingSchema);