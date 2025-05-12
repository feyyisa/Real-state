const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/make', paymentController.makePayment);
router.get('/user/:userId', paymentController.getPaymentsByUser);
router.get('/all', paymentController.getAllPayments);

module.exports = router;
