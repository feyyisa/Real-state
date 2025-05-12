const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Properties', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['card', 'cash', 'chapa'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Payments", paymentSchema);
