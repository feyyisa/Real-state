const axios = require('axios');
const Booking = require('../models/Booking');
const Property = require('../models/Property');

// 1. Create a dedicated payment verification service
class PaymentVerificationService {
  constructor() {
    this.interval = null;
    this.intervalMinutes = 1;
  }

  async verifyPayments() {
    try {
      console.log('Running payment verification check...');
      
      const unpaidBookings = await Booking.find({ 
        paymentStatus: 'unpaid',
        paymentReceipt: { $ne: 'pending' }
      }).populate('property');

      for (const booking of unpaidBookings) {
        try {
          const response = await axios.get(
            `https://api.chapa.co/v1/transaction/verify/${booking.paymentReceipt}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
              },
              timeout: 10000 // 10 second timeout
            }
          );

          const paymentData = response.data.data;
          if (paymentData.status === 'success') {
            await Promise.all([
              Booking.findByIdAndUpdate(booking._id, {
                paymentStatus: 'paid',  
              }),
              Property.findByIdAndUpdate(
                booking.property._id,
                { status: 'booked' }
              )
            ]);
            console.log(`Verified payment for booking ${booking._id}`);
          } else {
            await this.handleFailedPayment(booking);
          }
        } catch (error) {
          console.error(`Payment verification error for booking ${booking._id}:`, error.message);
          await this.handleFailedPayment(booking);
        }
      }
    } catch (error) {
      console.error('Payment verification service error:', error);
    }
  }

  async handleFailedPayment(booking) {
    await Promise.all([
      Booking.findByIdAndDelete(booking._id),
      Property.findByIdAndUpdate(
        booking.property._id,
        { status: 'available' }
      )
    ]);
    console.log(`Cleaned up failed payment for booking ${booking._id}`);
  }

  start() {
    // Clear any existing interval
    if (this.interval) clearInterval(this.interval);
    
    // Run immediately
    this.verifyPayments();
    
    // Set up recurring execution
    this.interval = setInterval(
      () => this.verifyPayments(),
      this.intervalMinutes * 60 * 1000
    );
    
    console.log(`Payment verification service started (running every ${this.intervalMinutes} minutes)`);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    console.log('Payment verification service stopped');
  }
}

// 2. Initialize and start the service
const paymentVerificationService = new PaymentVerificationService();

// 3. Export for potential manual control
module.exports = paymentVerificationService;