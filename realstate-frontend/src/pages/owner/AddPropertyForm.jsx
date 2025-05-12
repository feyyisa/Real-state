import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPropertyForm = ({ ownerId, onPropertyAdded }) => {
  const initialFormState = {
    owner: ownerId || '',
    title: '',
    description: '',
    propertyType: 'apartment',
    listingType: 'rent',
    price: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    location: {
      address: '',
      city: '',
      latitude: '',
      longitude: '',
    },
    amenities: {
      furnished: false,
      parking: false,
      wifi: false,
      security: false,
    },
    yearBuilt: '',
    condition: 'new',
    status: 'available',
    availableFrom: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setFormData((prev) => ({ ...prev, owner: loggedInUser._id }));
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name.split('.')[1]]: value },
      }));
    } else if (name.startsWith('amenities.')) {
      setFormData((prev) => ({
        ...prev,
        amenities: { ...prev.amenities, [name.split('.')[1]]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle amenities checkbox changes
  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: { ...prev.amenities, [name]: checked },
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // Redirect to login page if not logged in
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();

    // Append form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'object' && !(value instanceof File)) {
        if (key === 'location' || key === 'amenities') {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      } else {
        data.append(key, value);
      }
    });

    // Append image files to FormData
    Array.from(imageFiles).forEach((file) => {
      data.append('propertyImages', file); // 'propertyImages' is the field for image upload
    });

    try {
      const response = await axios.post('http://localhost:5000/api/properties', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`,
        },
      });
      alert('✅ Property added successfully!');
      setFormData({ ...initialFormState, owner: user._id });
      setImageFiles([]);
      if (onPropertyAdded) onPropertyAdded();
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      alert(`❌ Failed to add property: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Property types and options
  const propertyTypes = ['apartment', 'house', 'villa', 'townhouse', 'commercial'];
  const listingTypes = ['rent', 'sell'];
  const conditionOptions = ['new', 'good', 'fair', 'poor'];
  const statusOptions = ['available', 'booked', 'sold'];

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Property</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium">Title*</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Description*</label>
          <textarea
            name="description"
            rows={2}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Property Type*</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Listing Type*</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {listingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Price*</label>
          <input
            name="price"
            type="number"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Size (sq ft)*</label>
          <input
            name="size"
            type="number"
            required
            value={formData.size}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bedrooms*</label>
          <input
            name="bedrooms"
            type="number"
            required
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bathrooms*</label>
          <input
            name="bathrooms"
            type="number"
            required
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Latitude</label>
          <input
            name="location.latitude"
            value={formData.location.latitude}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Longitude</label>
          <input
            name="location.longitude"
            value={formData.location.longitude}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="col-span-2 flex flex-wrap gap-4">
          {Object.keys(formData.amenities).map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={amenity}
                checked={formData.amenities[amenity]}
                onChange={handleAmenityChange}
              />
              <span className="capitalize">{amenity}</span>
            </label>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium">Year Built</label>
          <input
            name="yearBuilt"
            type="number"
            value={formData.yearBuilt}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Condition*</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {conditionOptions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Status*</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Available From</label>
          <input
            name="availableFrom"
            type="date"
            value={formData.availableFrom}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Property Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding Property...' : 'Add Property'}
      </button>
    </form>
  );
};

export default AddPropertyForm;
