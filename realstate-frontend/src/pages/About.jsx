import React from "react";

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen p-10 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
      <p className="text-gray-600 max-w-3xl mx-auto mb-6 text-justify">
        Welcome to our Real Estate Management System, a platform designed to simplify property
        transactions for buyers, sellers, and real estate agents. We provide a seamless experience
        for searching, booking, and managing properties, ensuring that every aspect of your real estate
        journey is efficient and stress-free.
      </p>
      <h2 className="text-2xl font-bold text-gray-700 mt-6">Our Mission</h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-6 text-justify">
        Our mission is to make real estate transactions smooth, transparent, and efficient by leveraging
        modern technology. We connect buyers with the best properties, while offering powerful tools for
        property owners to manage their listings and streamline the sales process.
      </p>
      <h2 className="text-2xl font-bold text-gray-700 mt-6">Why Choose Us?</h2>
      <ul className="text-gray-600 max-w-3xl mx-auto list-disc list-inside mb-6 text-left">
        <li>Advanced property search with detailed filters and sorting options.</li>
        <li>Secure, hassle-free payment processing.</li>
        <li>Immersive virtual property tours for a more engaging experience.</li>
        <li>Real-time notifications and updates on your transactions and bookings.</li>
        <li>Dedicated customer support and personalized recommendations tailored to your needs.</li>
      </ul>
    </div>
  );
}
