import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import villaImage from "../../assets/villa2.webp";
import FeedbackForm from "./FeedbackForm";
import { useNavigate } from "react-router-dom";
import { MdOutlineKingBed, MdOutlineBathtub, MdDateRange } from 'react-icons/md';

// Ethiopian regions and sample cities
const ethiopianRegions = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "Southern Nations, Nationalities, and Peoples' Region (SNNPR)",
  "Tigray"
];

const citiesByRegion = {
  "Addis Ababa": ["Addis Ababa"],
  "Afar": ["Semera", "Asaita", "Awash", "Logiya"],
  "Amhara": ["Bahir Dar", "Gondar", "Dessie", "Debre Markos", "Kombolcha"],
  "Benishangul-Gumuz": ["Asosa", "Metekel", "Bambasi"],
  "Dire Dawa": ["Dire Dawa"],
  "Gambela": ["Gambela", "Agnwa", "Itang"],
  "Harari": ["Harar", "Dire Dawa"],
  "Oromia": ["Adama", "Jimma", "Bishoftu", "Ambo", "Nekemte", "Shashamane"],
  "Sidama": ["Hawassa", "Yirgalem", "Aleta Wondo"],
  "Somali": ["Jijiga", "Degehabur", "Kebri Dahar"],
  "Southern Nations, Nationalities, and Peoples' Region (SNNPR)": ["Awasa", "Arba Minch", "Sodo", "Dilla"],
  "Tigray": ["Mekelle", "Adigrat", "Axum", "Shire"]
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedroomsFilter, setBedroomsFilter] = useState("");
  const [bathroomsFilter, setBathroomsFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const SERVER_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${SERVER_URL}/api/properties/customer/properties`);
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

 // In the Home component, update the handleBookAndPay function:
const handleBookAndPay = (propertyId) => {
  navigate(`/bookhouse/${propertyId}`);
};

  const filteredProperties = properties
    .filter((property) => (typeFilter ? property?.listingType === typeFilter : true))
    .filter((property) => (selectedRegion ? property?.location?.region === selectedRegion : true))
    .filter((property) => (selectedCity ? property?.location?.city === selectedCity : true))
    .filter((property) => {
      const price = property?.price || 0;
      return (
        (minPrice === "" || price >= parseInt(minPrice)) && 
        (maxPrice === "" || price <= parseInt(maxPrice))
      );
    })
    .filter((property) => (bedroomsFilter ? property?.bedrooms === parseInt(bedroomsFilter) : true))
    .filter((property) => (bathroomsFilter ? property?.bathrooms === parseInt(bathroomsFilter) : true))
    .sort((a, b) => {
      if (sortOption === "price-asc") return (a?.price || 0) - (b?.price || 0);
      if (sortOption === "price-desc") return (b?.price || 0) - (a?.price || 0);
      if (sortOption === "size-asc") return parseInt(a?.size || 0) - parseInt(b?.size || 0);
      if (sortOption === "size-desc") return parseInt(b?.size || 0) - parseInt(a?.size || 0);
      return 0;
    });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB'
    }).format(price);
  };

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}/uploads/${imagePath}`;
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedCity(""); // Reset city when region changes
  };

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

      <section className="py-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">{t("filterType")}</option>
            <option value="rent">{t("rent")}</option>
            <option value="sell">{t("buy")}</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">{t("sortBy")}</option>
            <option value="price-asc">{t("priceAsc")}</option>
            <option value="price-desc">{t("priceDesc")}</option>
            <option value="size-asc">{t("sizeAsc")}</option>
            <option value="size-desc">{t("sizeDesc")}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="border p-2 rounded"
          >
            <option value="">Filter by Region</option>
            {ethiopianRegions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedRegion}
            className="border p-2 rounded"
          >
            <option value="">Filter by City</option>
            {selectedRegion && citiesByRegion[selectedRegion]?.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={bedroomsFilter}
              onChange={(e) => setBedroomsFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Bedrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>

            <select
              value={bathroomsFilter}
              onChange={(e) => setBathroomsFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Bathrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
      </section>

      <section className="py-6 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {t("featuredProperties")}
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div 
                  key={property._id} 
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getFullImageUrl(property.profileImage)}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Property+Image';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded text-sm font-semibold">
                      {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                      <p className="text-white font-bold text-lg">{formatPrice(property.price)}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 truncate">{property.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">
                        {property.location?.city}, {property.location?.region}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h2v2H7V5zm4 0h2v2h-2V5zm-4 4h2v2H7V9zm4 0h2v2h-2V9zm-4 4h2v2H7v-2zm4 0h2v2h-2v-2z" clipRule="evenodd" />
                        </svg>
                        {property.size} sqm
                      </div>
                      <div className="flex items-center">
                        <MdOutlineKingBed className="h-5 w-5"/>
                        {property.bedrooms || 0} Beds
                      </div>
                      <div className="flex items-center">
                        <MdOutlineBathtub className="h-5 w-5"/>
                        {property.bathrooms || 0} Baths
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg">No properties found matching your criteria</p>
                <button 
                  onClick={() => {
                    setTypeFilter('');
                    setSelectedRegion('');
                    setSelectedCity('');
                    setMinPrice('');
                    setMaxPrice('');
                    setBedroomsFilter('');
                    setBathroomsFilter('');
                  }}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Property Detail Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                  onClick={() => setSelectedProperty(null)}
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Main Profile Image */}
                <div className="relative h-64 md:h-96 bg-gray-200">
                  <img
                    src={getFullImageUrl(selectedProperty.profileImage)}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Additional Images Section */}
                <div className="p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-2">Property Images</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProperty.bedroomImage && (
                      <div className="h-32 rounded overflow-hidden">
                        <img
                          src={getFullImageUrl(selectedProperty.bedroomImage)}
                          alt="Bedroom"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Bedroom+Image';
                          }}
                        />
                        <p className="text-xs text-center mt-1">Bedroom</p>
                      </div>
                    )}
                    {selectedProperty.bathroomImage && (
                      <div className="h-32 rounded overflow-hidden">
                        <img
                          src={getFullImageUrl(selectedProperty.bathroomImage)}
                          alt="Bathroom"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Bathroom+Image';
                          }}
                        />
                        <p className="text-xs text-center mt-1">Bathroom</p>
                      </div>
                    )}
                    {selectedProperty.otherImage && (
                      <div className="h-32 rounded overflow-hidden">
                        <img
                          src={getFullImageUrl(selectedProperty.otherImage)}
                          alt="Property"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Property+Image';
                          }}
                        />
                        <p className="text-xs text-center mt-1">Property</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedProperty.title}</h2>
                      <div className="flex items-center text-gray-600 mt-1">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          {selectedProperty.location?.kifleKetemaOrKebelle}, {selectedProperty.location?.city}, {selectedProperty.location?.region}
                        </span>
                      </div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedProperty.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{selectedProperty.description}</p>
                      
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Property Details</h4>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span className="text-gray-600">Price:</span>
                              <span className="font-medium">{formatPrice(selectedProperty.price)}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600">Size:</span>
                              <span className="font-medium">{selectedProperty.size} sqm</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600">Bedrooms:</span>
                              <span className="font-medium">{selectedProperty.bedrooms || 0}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600">Bathrooms:</span>
                              <span className="font-medium">{selectedProperty.bathrooms || 0}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600">Year Built:</span>
                              <span className="font-medium">{selectedProperty.yearBuilt || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-gray-600">Condition:</span>
                              <span className="font-medium">{selectedProperty.condition || 'N/A'}</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Features & Amenities</h4>
                          <div className="space-y-2">
                            {selectedProperty.features?.length > 0 && (
                              <div>
                                <h5 className="text-sm font-medium text-gray-700">Features:</h5>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {selectedProperty.features.map((feature, idx) => (
                                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {selectedProperty.amenities && (
                              <div>
                                <h5 className="text-sm font-medium text-gray-700">Amenities:</h5>
                                <div className="grid grid-cols-2 gap-1 mt-1">
                                  {Object.entries(selectedProperty.amenities).map(([key, value]) => (
                                    <div key={key} className="flex items-center">
                                      <span className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                      <span className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Contact & Booking</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-600">Status:</p>
                          <p className={`font-medium ${
                            selectedProperty.status === 'available' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {selectedProperty.status === 'available' ? 'Available' : 'Booked'}
                          </p>
                        </div>
                        
                        {selectedProperty.availableFrom && (
                          <div>
                            <p className="text-gray-600">Available From:</p>
                            <p className="font-medium">
                              {new Date(selectedProperty.availableFrom).toLocaleDateString()}
                            </p>
                          </div>
                        )}

                        <button
                          onClick={() => handleBookAndPay(selectedProperty._id)}
                          disabled={selectedProperty.status !== 'available'}
                          className={`w-full py-2 px-4 rounded font-medium ${
                            selectedProperty.status === 'available'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          }`}
                        >
                          {selectedProperty.status === 'available' ? 'Book Now' : 'Currently Booked'}
                        </button>

                        <button
                          onClick={() => setSelectedProperty(null)}
                          className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              
                {/* Feedback Form */}
                <div className="p-6 border-t">
                  <FeedbackForm propertyId={selectedProperty._id} />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;