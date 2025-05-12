const axios = require('axios');

const CHAPA_SECRET_KEY = 'CHASECK_TEST-jMXZdWwG2IRD0trOH46hrf1qEpRTcxju'; // 🔐 Replace with your real key

// Initiate Payment
exports.initiatePayments = async (paymentData) => {
  try {
    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;  // This is what the controller expects
  } catch (err) {
    console.error('Chapa Error:', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Chapa payment failed');
  }
};

// Verify Payment
exports.verifyPayments = async (tx_ref) => {
  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        },
      }
    );
    return response.data;  // This is what the controller expects
  } catch (err) {
    console.error('Chapa Verification Error:', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Chapa verification failed');
  }
};
