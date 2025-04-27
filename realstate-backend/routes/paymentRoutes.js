const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST /api/payments - Create a payment
router.post('/', paymentController.createPayment);

// GET /api/payments - Get all payments
router.get('/', paymentController.getAllPayments);

// GET /api/payments/:id - Get payment by ID
router.get('/:id', paymentController.getPaymentById);
router.put('/:id/complete', paymentController.completePayment);

module.exports = router;
