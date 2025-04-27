import React from "react";

export default function Services() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen p-10 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-white mb-6 text-center">Our Services</h1>
      <p className="text-gray-300 max-w-3xl text-center mb-10 text-lg">
        We provide a wide range of real estate services to help buyers, sellers, and property owners
        manage their transactions efficiently.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { title: "Property Listings", desc: "Browse thousands of verified property listings with detailed descriptions and images." },
          { title: "Property Management", desc: "Manage your property listings, update details, and track bookings easily." },
          { title: "Advanced Search & Filters", desc: "Use powerful filters to search properties based on location, price, and amenities." },
          { title: "Virtual Property Tours", desc: "Experience properties with immersive virtual tours before making a decision." },
          { title: "Secure Payment Processing", desc: "Make hassle-free transactions with our secure and reliable payment gateway." },
          { title: "Customer Support", desc: "Get assistance anytime with our dedicated 24/7 customer support team." },
        ].map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-xl rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-3">{service.title}</h2>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
