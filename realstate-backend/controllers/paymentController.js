const Payment = require('../models/Payment');
const Property = require('../models/Property');

exports.makePayment = async (req, res) => {
  try {
    const { propertyId, customerId, amount, paymentMethod } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const ownerId = property.ownerId;

    const newPayment = new Payment({
      propertyId,
      customerId,
      ownerId,
      amount,
      paymentMethod,
      status: 'completed' // In real-world, handle actual processing
    });

    await newPayment.save();

    // Optionally update property status
    property.status = 'booked';
    await property.save();

    res.status(201).json({ message: 'Payment successful', payment: newPayment });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ customerId: userId }).populate('propertyId ownerId');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving payments", error: err.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('propertyId customerId ownerId');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving all payments", error: err.message });
  }
};
