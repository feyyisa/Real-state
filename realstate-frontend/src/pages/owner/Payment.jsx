import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PaymentForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { property, actionType } = state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);

  useEffect(() => {
    if (!property) {
      navigate("/");
    }
  }, [property, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        propertyId: property._id,
        name: "User Name", // Replace with actual user name
        email: "user@example.com", // Replace with actual user email
        phone: "1234567890", // Replace with actual user phone number
        amount: property.price,
      });

      if (res.data.checkout_url) {
        setPaymentUrl(res.data.checkout_url);
      }
    } catch (err) {
      console.error("Error during payment initiation:", err);
      setError("Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center mb-4">
        {actionType === "buy" ? t("buyProperty") : t("rentProperty")}
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-xl font-semibold">{property?.location}</h3>
        <p>{t("price")}: {property?.price} br</p>
        <p>{t("type")}: {property?.type}</p>
        <p>{t("size")}: {property?.size}</p>
        <p>{t("status")}: {property?.status}</p>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {loading ? t("processing") : t("proceedToPayment")}
        </button>
      </div>
      {paymentUrl && (
        <div className="mt-6">
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            {t("payNow")}
          </a>
        </div>
      )}
    </div>
  );
};
export default PaymentForm;
