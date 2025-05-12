import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import villaImage from "../../assets/villa2.webp";
import FeedbackForm from "./FeedbackForm";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/properties");
        const data = res.data;
        const normalized = Array.isArray(data)
          ? data
          : data?.data || data?.properties || [];
        setProperties(normalized);
        setError(null);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(t("errorLoading"));
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [t]);

  const handleBookAndPay = () => {
    if (!selectedProperty) return;
    navigate("/bookhouse", { state: { property: selectedProperty } });
  };

  const filteredProperties = properties
    .filter((property) =>
      typeof property?.location === "object"
        ? property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.address.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .filter((property) => (typeFilter ? property?.listingType === typeFilter : true))
    .filter((property) => (statusFilter ? property?.status === statusFilter : true))
    .sort((a, b) => {
      if (sortOption === "price-asc") return (a?.price || 0) - (b?.price || 0);
      if (sortOption === "price-desc") return (b?.price || 0) - (a?.price || 0);
      if (sortOption === "size-asc") return parseInt(a?.size || 0) - parseInt(b?.size || 0);
      if (sortOption === "size-desc") return parseInt(b?.size || 0) - parseInt(a?.size || 0);
      return 0;
    });

  return (
    <div className="bg-gray-100 min-h-screen">
      <header
        className="relative bg-cover bg-center h-[400px]"
        style={{ backgroundImage: `url(${villaImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-semibold">{t("findYourHome")}</h1>
        </div>
      </header>

      <section className="py-6 px-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
        <input
          type="text"
          placeholder={t("searchLocation")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/4 border p-2 rounded"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full md:w-1/4 border p-2 rounded"
        >
          <option value="">{t("filterType")}</option>
          <option value="rent">{t("rent")}</option>
          <option value="sell">{t("buy")}</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/4 border p-2 rounded"
        >
          <option value="">{t("filterStatus")}</option>
          <option value="available">{t("status")}: Available</option>
          <option value="booked">{t("status")}: Booked</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full md:w-1/4 border p-2 rounded"
        >
          <option value="">{t("sortBy")}</option>
          <option value="price-asc">{t("priceAsc")}</option>
          <option value="price-desc">{t("priceDesc")}</option>
          <option value="size-asc">{t("sizeAsc")}</option>
          <option value="size-desc">{t("sizeDesc")}</option>
        </select>
      </section>

      <section className="py-6 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {t("featuredProperties")}
        </h2>
        {loading ? (
          <p className="text-center text-blue-500">{t("loading")}</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/${property.image}`}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                    <p className="text-blue-600 font-semibold">{property.price} br</p>
                    <p className="text-sm">{property.location?.address}, {property.location?.city}</p>
                    <p>{property.bedrooms} Bedrooms | {property.bathrooms} Bathrooms</p>
                    <p>Size: {property.size} sqm</p>
                    <p>Status: {property.status}</p>
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      {t("view")}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">{t("noProperties")}</p>
            )}
          </div>
        )}

        {/* Property Detail Modal with Feedback Form */}
        {selectedProperty && (
          <div className="mt-12 bg-white shadow p-6 rounded relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setSelectedProperty(null)}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedProperty.title}</h3>
            <img
              src={`http://localhost:5000/uploads/${selectedProperty.image}`}
              alt={selectedProperty.title}
              className="w-full h-64 object-cover mb-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <p><strong>Address:</strong> {selectedProperty.location?.address}</p>
              <p><strong>City:</strong> {selectedProperty.location?.city}</p>
              <p><strong>Latitude:</strong> {selectedProperty.location?.latitude}</p>
              <p><strong>Longitude:</strong> {selectedProperty.location?.longitude}</p>
              <p><strong>Type:</strong> {selectedProperty.propertyType}</p>
              <p><strong>Listing:</strong> {selectedProperty.listingType}</p>
              <p><strong>Size:</strong> {selectedProperty.size} sqm</p>
              <p><strong>Bedrooms:</strong> {selectedProperty.bedrooms}</p>
              <p><strong>Bathrooms:</strong> {selectedProperty.bathrooms}</p>
              <p><strong>Year Built:</strong> {selectedProperty.yearBuilt}</p>
              <p><strong>Condition:</strong> {selectedProperty.condition}</p>
              <p><strong>Status:</strong> {selectedProperty.status}</p>
              <p><strong>Available From:</strong> {selectedProperty.availableFrom}</p>

              {selectedProperty.features?.length > 0 && (
                <div className="col-span-2">
                  <strong>Features:</strong>
                  <ul className="list-disc ml-6">
                    {selectedProperty.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProperty.amenities && (
                <div className="col-span-2">
                  <strong>Amenities:</strong>
                  <ul className="list-disc ml-6">
                    {Object.entries(selectedProperty.amenities).map(([key, value], idx) => (
                      <li key={idx}>{key}: {value ? "Yes" : "No"}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleBookAndPay}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                {t("bookAndPay")}
              </button>
              <button
                onClick={() => setSelectedProperty(null)}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
              >
                {t("close")}
              </button>
            </div>

            {/* ✅ Show Feedback Form only after user clicks View */}
            <FeedbackForm propertyId={selectedProperty._id} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
