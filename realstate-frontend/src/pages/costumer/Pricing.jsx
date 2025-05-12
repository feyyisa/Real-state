import React from "react";

export default function Pricing() {
  return (
    <div className="bg-gray-100 min-h-screen p-10 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Pricing Plans</h1>
      <p className="text-gray-600 max-w-3xl mx-auto mb-6">
        Choose the perfect plan that suits your real estate needs. Whether you're an individual 
        buyer, a property owner, or a real estate agency, we have a plan for you.
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-700">Basic Plan</h2>
          <p className="text-gray-600">$9.99/month</p>
          <ul className="text-gray-600 list-disc list-inside mt-4">
            <li>List up to 5 properties</li>
            <li>Basic property search</li>
            <li>Email support</li>
          </ul>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Choose Plan
          </button>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-700">Premium Plan</h2>
          <p className="text-gray-600">$29.99/month</p>
          <ul className="text-gray-600 list-disc list-inside mt-4">
            <li>List unlimited properties</li>
            <li>Advanced search & filters</li>
            <li>Priority email & chat support</li>
          </ul>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Choose Plan
          </button>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-700">Enterprise Plan</h2>
          <p className="text-gray-600">$99.99/month</p>
          <ul className="text-gray-600 list-disc list-inside mt-4">
            <li>All premium features</li>
            <li>Dedicated account manager</li>
            <li>Priority customer support</li>
          </ul>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
}
