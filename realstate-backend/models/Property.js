const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
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
    region: String,
    city: String,
    kifleKetemaOrKebelle: String,
  },
  profileImage: { type: String },
  bedroomImage: { type: String },
  bathroomImage: { type: String },
  otherImage: { type: String },
  approvalStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  rejectionReason: { type: String },
  ownershipDocument: { type: String },
  views: { type: Number, default: 0 },
  inquiries: { type: Number, default: 0 },
  acceptedBookings: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.property || mongoose.model('property', propertySchema);
