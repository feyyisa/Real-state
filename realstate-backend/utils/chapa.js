const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const CHAPA_URL = 'https://api.chapa.co/v1/transaction/initialize';

async function initializeChapaPayment({ amount, email, first_name, phone_number, return_url }) {
  const tx_ref = uuidv4();

  try {
    const response = await axios.post(
      CHAPA_URL,
      {
        amount,
        currency: 'ETB',
        email,
        first_name,
        phone_number,
        tx_ref,
        callback_url: return_url,
        return_url,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return { tx_ref, checkout_url: response.data.data.checkout_url };
  } catch (error) {
    console.error("Chapa Init Error:", error.response?.data || error.message);
    throw new Error('Chapa payment initialization failed');
  }
}

module.exports = initializeChapaPayment;
