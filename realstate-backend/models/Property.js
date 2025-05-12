const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  propertyType: String,
  listingType: { type: String, enum: ["rent", "sell"] },
  price: { type: Number, required: true },
  size: Number,
  bedrooms: Number,
  bathrooms: Number,
  yearBuilt: Number,
  condition: String,
  status: { type: String, enum: ["available", "booked"], default: "available" },
  availableFrom: Date,
  features: [String],
  amenities: {
    parking: Boolean,
    swimmingPool: Boolean,
    gym: Boolean,
    wifi: Boolean,
    security: Boolean,
  },
  location: {
    address: String,
    city: String,
    latitude: Number,
    longitude: Number,
  },
  views: { type: Number, default: 0 },
  image: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  inquiries: { type: Number, default: 0 },
  acceptedBookings: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.models.property || mongoose.model('property', propertySchema);



