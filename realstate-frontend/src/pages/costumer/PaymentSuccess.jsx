// pages/PaymentStatus.jsx
import { useLocation } from 'react-router-dom';

const PaymentStatus = () => {
  const { search } = useLocation();
  const status = new URLSearchParams(search).get("status");

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Payment {status}</h2>
      <p>Thank you for booking!</p>
    </div>
  );
};

export default PaymentStatus;
