import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

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

const conditionOptions = [
  "New",
  "Good",
  "Fair",
  "Poor",
  "Under Construction",
  "Renovated"
];

const AddPropertyForm = ({ onPropertyAdded }) => {
  const initialFormState = {
    title: '',
    description: '',
    listingType: 'rent',
    price: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    condition: 'Good',
    status: 'available',
    availableFrom: '',
    features: [],
    amenities: {
      parking: false,
      swimmingPool: false,
      gym: false,
      wifi: false,
      security: false,
    },
    location: {
      region: '',
      city: '',
      kifleKetemaOrKebelle: '',
    },
    profileImage: null,
    bedroomImage: null,
    bathroomImage: null,
    otherImage: null,
    ownershipDocument: null,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [featureInput, setFeatureInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'title':
        if (!value.trim()) error = 'Title is required';
        else if (value.length < 10) error = 'Title should be at least 10 characters';
        else if (value.length > 100) error = 'Title should not exceed 100 characters';
        break;
      case 'description':
        if (!value.trim()) error = 'Description is required';
        else if (value.length < 50) error = 'Description should be at least 50 characters';
        else if (value.length > 2000) error = 'Description should not exceed 2000 characters';
        break;
      case 'price':
        if (!value) error = 'Price is required';
        else if (isNaN(value)) error = 'Price must be a number';
        else if (value <= 0) error = 'Price must be greater than 0';
        else if (value > 1000000000) error = 'Price seems unrealistically high';
        break;
      case 'size':
        if (value && isNaN(value)) error = 'Size must be a number';
        else if (value && value <= 0) error = 'Size must be greater than 0';
        else if (value && value > 10000) error = 'Size seems too large for a property';
        break;
      case 'bedrooms':
        if (value && isNaN(value)) error = 'Bedrooms must be a number';
        else if (value && value < 0) error = 'Bedrooms cannot be negative';
        else if (value && value > 20) error = 'More than 20 bedrooms seems unrealistic';
        break;
      case 'bathrooms':
        if (value && isNaN(value)) error = 'Bathrooms must be a number';
        else if (value && value < 0) error = 'Bathrooms cannot be negative';
        else if (value && value > 20) error = 'More than 20 bathrooms seems unrealistic';
        break;
      case 'yearBuilt':
        if (value && isNaN(value)) error = 'Year built must be a number';
        else if (value && (value < 1800 || value > new Date().getFullYear() + 1)) 
          error = `Year must be between 1800 and ${new Date().getFullYear() + 1}`;
        break;
      case 'availableFrom':
        if (value) {
          const selectedDate = new Date(value);
          const minDate = new Date();
          minDate.setFullYear(minDate.getFullYear() - 1);
          if (selectedDate < minDate) error = 'Date cannot be more than 1 year in the past';
        }
        break;
      case 'location.region':
        if (!value) error = 'Region is required';
        break;
      case 'location.city':
        if (!value) error = 'City is required';
        break;
      case 'location.kifleKetemaOrKebelle':
        if (value && value.length > 100) error = 'Address is too long';
        break;
      case 'profileImage':
        if (!value) error = 'Profile image is required';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear previous error for this field
    setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'location.region') {
      const selectedCities = citiesByRegion[value] || [];
      setCities(selectedCities);
      setFormData((prev) => ({
        ...prev,
        location: { 
          ...prev.location, 
          region: value,
          city: selectedCities.length > 0 ? selectedCities[0] : ''
        },
      }));
    } else if (name.startsWith('location.')) {
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFeatureAdd = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput)) {
      if (formData.features.length >= 10) {
        setErrors(prev => ({ ...prev, features: 'Maximum 10 features allowed' }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput],
      }));
      setFeatureInput('');
      setErrors(prev => ({ ...prev, features: '' }));
    }
  };

  const handleFeatureRemove = (featureToRemove) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (file) {
      // Validate file types
      if (name === 'ownershipDocument' && !file.type.match(/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|jpeg|png)/)) {
        setErrors(prev => ({ ...prev, [name]: 'Only PDF, DOC, DOCX, JPG, or PNG files allowed' }));
        return;
      }
      
      if (name.includes('Image') && !file.type.match(/image\/(jpeg|png|jpg)/)) {
        setErrors(prev => ({ ...prev, [name]: 'Only JPG or PNG images allowed' }));
        return;
      }
      
      // Validate file sizes (5MB max for images, 10MB for documents)
      const maxSize = name === 'ownershipDocument' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: `File too large (max ${name === 'ownershipDocument' ? '10MB' : '5MB'})` 
        }));
        return;
      }
    }
    
    setFormData((prev) => ({ ...prev, [name]: file }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'object' && !(formData[key] instanceof File)) {
        Object.keys(formData[key]).forEach(subKey => {
          if (key === 'amenities') return; // Skip amenities validation
          const fullKey = `${key}.${subKey}`;
          const error = validateField(fullKey, formData[key][subKey]);
          if (error) {
            newErrors[fullKey] = error;
            isValid = false;
          }
        });
      } else if (key !== 'features' && key !== 'amenities') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    // Special validation for profile image
    if (!formData.profileImage) {
      newErrors.profileImage = 'Profile image is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      navigate('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    
    // Append all files
    if (formData.profileImage) data.append('profileImage', formData.profileImage);
    if (formData.bedroomImage) data.append('bedroomImage', formData.bedroomImage);
    if (formData.bathroomImage) data.append('bathroomImage', formData.bathroomImage);
    if (formData.otherImage) data.append('otherImage', formData.otherImage);
    if (formData.ownershipDocument) data.append('ownershipDocument', formData.ownershipDocument);
    
    // Append other form data
    data.append('owner', userId);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('listingType', formData.listingType);
    data.append('price', formData.price);
    data.append('size', formData.size);
    data.append('bedrooms', formData.bedrooms);
    data.append('bathrooms', formData.bathrooms);
    data.append('yearBuilt', formData.yearBuilt);
    data.append('condition', formData.condition);
    data.append('status', formData.status);
    if (formData.availableFrom) data.append('availableFrom', formData.availableFrom);
    data.append('features', JSON.stringify(formData.features));
    data.append('amenities', JSON.stringify(formData.amenities));
    data.append('location', JSON.stringify(formData.location));

    try {
      await axios.post('http://localhost:5000/api/properties', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (onPropertyAdded) onPropertyAdded();
      setFormData(initialFormState);
      navigate('/owner/ownerpropertymanager');
      alert("Property Added successfully!");
    } catch (error) {
      console.error("Error submitting property:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error submitting property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const listingTypes = ['rent', 'sell'];
  const statusOptions = ['available', 'booked'];

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Property</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Title*</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            minLength="10"
            maxLength="100"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Description*</label>
          <textarea
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            minLength="50"
            maxLength="2000"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Listing Type */}
        <div>
          <label className="block text-sm font-medium">Listing Type*</label>
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            {listingTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price* (ETB)</label>
          <input
            name="price"
            type="number"
            required
            value={formData.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            min="1"
            max="1000000000"
            step="1"
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium">Size (sq ft)</label>
          <input
            name="size"
            type="number"
            value={formData.size}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors.size ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            min="1"
            max="10000"
          />
          {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium">Bedrooms</label>
          <input
            name="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            min="0"
            max="20"
          />
          {errors.bedrooms && <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>}
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium">Bathrooms</label>
          <input
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors.bathrooms ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            min="0"
            max="20"
          />
          {errors.bathrooms && <p className="text-red-500 text-xs mt-1">{errors.bathrooms}</p>}
        </div>

        {/* Year Built */}
        <div>
          <label className="block text-sm font-medium">Year Built</label>
          <input
            name="yearBuilt"
            type="number"
            value={formData.yearBuilt}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors.yearBuilt ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            min="1800"
            max={new Date().getFullYear() + 1}
          />
          {errors.yearBuilt && <p className="text-red-500 text-xs mt-1">{errors.yearBuilt}</p>}
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium">Condition*</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            {conditionOptions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
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
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Available From */}
        <div>
          <label className="block text-sm font-medium">Available From</label>
          <input
            name="availableFrom"
            type="date"
            value={formData.availableFrom}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors.availableFrom ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            min={new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]}
          />
          {errors.availableFrom && <p className="text-red-500 text-xs mt-1">{errors.availableFrom}</p>}
        </div>

        {/* Features */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Features</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              placeholder="Add a feature (e.g., Garden, Balcony)"
              maxLength="50"
            />
            <button
              type="button"
              onClick={handleFeatureAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => handleFeatureRemove(feature)}
                  className="ml-2 text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Location - Region */}
        <div>
          <label className="block text-sm font-medium">Region*</label>
          <select
            name="location.region"
            value={formData.location.region}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors['location.region'] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            required
          >
            <option value="">Select Region</option>
            {ethiopianRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors['location.region'] && <p className="text-red-500 text-xs mt-1">{errors['location.region']}</p>}
        </div>

        {/* Location - City */}
        <div>
          <label className="block text-sm font-medium">City*</label>
          <select
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors['location.city'] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            required
            disabled={!formData.location.region}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors['location.city'] && <p className="text-red-500 text-xs mt-1">{errors['location.city']}</p>}
        </div>

        {/* Location - Kifle Ketema/Kebelle */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Kifle Ketema/Kebelle</label>
          <input
            name="location.kifleKetemaOrKebelle"
            value={formData.location.kifleKetemaOrKebelle}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border ${errors['location.kifleKetemaOrKebelle'] ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
            placeholder="e.g., Kirkos Sub-city, Woreda 08"
            maxLength="100"
          />
          {errors['location.kifleKetemaOrKebelle'] && <p className="text-red-500 text-xs mt-1">{errors['location.kifleKetemaOrKebelle']}</p>}
        </div>

        {/* Amenities */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(formData.amenities).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`amenities.${key}`}
                  checked={value}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Uploads */}
        <div className="col-span-2 border-t pt-4">
          <h3 className="text-lg font-medium mb-4">Property Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Profile Image*</label>
              <input
                type="file"
                name="profileImage"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className={`w-full ${errors.profileImage ? 'border-red-500' : ''}`}
                required
              />
              {errors.profileImage && <p className="text-red-500 text-xs mt-1">{errors.profileImage}</p>}
              <p className="text-xs text-gray-500 mt-1">JPEG or PNG, max 5MB</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bedroom Image</label>
              <input
                type="file"
                name="bedroomImage"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className={`w-full ${errors.bedroomImage ? 'border-red-500' : ''}`}
              />
              {errors.bedroomImage && <p className="text-red-500 text-xs mt-1">{errors.bedroomImage}</p>}
              <p className="text-xs text-gray-500 mt-1">JPEG or PNG, max 5MB</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bathroom Image</label>
              <input
                type="file"
                name="bathroomImage"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className={`w-full ${errors.bathroomImage ? 'border-red-500' : ''}`}
              />
              {errors.bathroomImage && <p className="text-red-500 text-xs mt-1">{errors.bathroomImage}</p>}
              <p className="text-xs text-gray-500 mt-1">JPEG or PNG, max 5MB</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Other Image</label>
              <input
                type="file"
                name="otherImage"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className={`w-full ${errors.otherImage ? 'border-red-500' : ''}`}
              />
              {errors.otherImage && <p className="text-red-500 text-xs mt-1">{errors.otherImage}</p>}
              <p className="text-xs text-gray-500 mt-1">JPEG or PNG, max 5MB</p>
            </div>
          </div>
        </div>

        {/* Ownership Document */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Ownership Document</label>
          <input
            type="file"
            name="ownershipDocument"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className={`w-full ${errors.ownershipDocument ? 'border-red-500' : ''}`}
          />
          {errors.ownershipDocument && <p className="text-red-500 text-xs mt-1">{errors.ownershipDocument}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Upload proof of ownership (PDF, DOC, DOCX, JPG, or PNG), max 10MB
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Property'}
        </button>
      </div>
    </form>
  );
};

export default AddPropertyForm;