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
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setFormData((prev) => ({ ...prev, owner: loggedInUser._id }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('location.')) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name.split('.')[1]]: value },
      }));
    } else if (name.startsWith('amenities.')) {
      setFormData((prev) => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [name.split('.')[1]]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append('image', imageFile);
    data.append('owner', formData.owner);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('propertyType', formData.propertyType);
    data.append('listingType', formData.listingType);
    data.append('price', formData.price);
    data.append('size', formData.size);
    data.append('bedrooms', formData.bedrooms);
    data.append('bathrooms', formData.bathrooms);
    data.append('yearBuilt', formData.yearBuilt);
    data.append('condition', formData.condition);
    data.append('status', formData.status);
    data.append('availableFrom', formData.availableFrom);
    data.append('location', JSON.stringify(formData.location));
    data.append('amenities', JSON.stringify(formData.amenities));

    try {
      await axios.post('/api/properties', data);
      if (onPropertyAdded) onPropertyAdded();
      setFormData(initialFormState);
      setImageFile(null);
      navigate('/properties');
    } catch (error) {
      console.error("Error submitting property:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Basic Fields */}
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

        {/* Location */}
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

        {/* Amenities */}
        <div className="col-span-2 flex flex-wrap gap-4">
          {Object.keys(formData.amenities).map((key) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={`amenities.${key}`}
                checked={formData.amenities[key]}
                onChange={handleChange}
              />
              <span>{key}</span>
            </label>
          ))}
        </div>

        {/* Additional Fields */}
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
          <label className="block text-sm font-medium">Condition</label>
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
          <label className="block text-sm font-medium">Status</label>
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

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Property Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Property'}
        </button>
      </div>
    </form>
  );
};

export default AddPropertyForm;
