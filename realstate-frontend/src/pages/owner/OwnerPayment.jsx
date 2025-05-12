import { useEffect, useState } from "react";
import axios from "axios";

const OwnerPayments = ({ ownerId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/payments/transactions/${ownerId}`)
      .then(res => setTransactions(res.data));
  }, [ownerId]);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Payment Transactions</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Tx Ref</th>
            <th className="p-2 border">Amount (ETB)</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id}>
              <td className="p-2 border">{tx.tx_ref}</td>
              <td className="p-2 border">{tx.amount}</td>
              <td className="p-2 border">{tx.status}</td>
              <td className="p-2 border">
                <a
                  href={`http://localhost:5000/api/payments/invoice/${tx.tx_ref}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerPayments;
