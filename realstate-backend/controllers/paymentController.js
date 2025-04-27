const Payment = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { property, buyer, amount } = req.body;

    const newPayment = new Payment({
      property,
      buyer,
      amount
    });

    await newPayment.save();

    res.status(201).json({
      message: 'Payment created successfully',
      payment: newPayment
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('property')
      .populate('buyer');

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('property')
      .populate('buyer');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// ✅ Get all payments by a specific user
exports.getPaymentsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const payments = await Payment.find({ buyer: userId })
      .populate('property')
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user payments',
      error: error.message
    });
  }
};

// ✅ Mark a payment as completed (e.g. after booking)
exports.completePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const updated = await Payment.findByIdAndUpdate(
      paymentId,
      { status: 'completed' },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({
      message: 'Payment marked as completed',
      payment: updated
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating payment',
      error: error.message
    });
  }
};
