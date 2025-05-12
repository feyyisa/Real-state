// components/Checkout.jsx
import React from 'react';
import axios from 'axios';

const Checkout = ({ propertyId, user }) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/payment/checkout", {
        userId: user._id,
        propertyId,
        amount: 1000, // Get from property
        email: user.email,
        first_name: user.name.split(" ")[0],
        last_name: user.name.split(" ")[1] || "User"
      });

      // Redirect to Chapa checkout
      window.location.href = response.data.checkout_url;
    } catch (err) {
      console.error("Payment error", err);
    }
  };

  return (
    <button onClick={handleCheckout} className="bg-blue-600 text-white px-4 py-2 rounded">
      Book & Pay with Chapa
    </button>
  );
};

export default Checkout;
