import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash, FaTimes, FaCar, FaSwimmingPool, FaDumbbell, FaWifi, FaShieldAlt } from 'react-icons/fa';
import { MdOutlineBathtub, MdOutlineKingBed, MdDateRange } from 'react-icons/md';
import { HiDocumentText } from 'react-icons/hi';

const OwnerPropertyManager = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const SERVER_URL = 'http://localhost:5000';

  // Helper function to construct full file URLs
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    // If the path already starts with http, return as-is
    if (filePath.startsWith('http')) return filePath;
    // Otherwise, prepend the server URL
    return `${SERVER_URL}/uploads/${filePath.replace(/^\/+/, '')}`;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProperties();
    }
  }, [userId, filter]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}/api/properties/owner/${userId}`);
      let filteredProperties = response.data;
      
      if (filter === 'available') filteredProperties = filteredProperties.filter(prop => prop.status === 'available');
      else if (filter === 'booked') filteredProperties = filteredProperties.filter(prop => prop.status === 'booked');
      else if (filter === 'rent') filteredProperties = filteredProperties.filter(prop => prop.listingType === 'rent');
      else if (filter === 'sell') filteredProperties = filteredProperties.filter(prop => prop.listingType === 'sell');
      else if (filter === 'approved') filteredProperties = filteredProperties.filter(prop => prop.approvalStatus === 'approved');
      else if (filter === 'pending') filteredProperties = filteredProperties.filter(prop => prop.approvalStatus === 'pending');
      else if (filter === 'rejected') filteredProperties = filteredProperties.filter(prop => prop.approvalStatus === 'rejected');
      
      setProperties(filteredProperties);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this property?')) {
        await axios.delete(`${SERVER_URL}/api/properties/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchProperties();
      }
    } catch (err) {
      setError('Failed to delete property: ' + err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/owner/editpropertyform/${id}`);
  };

  const handleViewDetails = (property) => {
    // Ensure all file URLs are properly constructed before showing modal
    const propertyWithFullUrls = {
      ...property,
      profileImage: getFileUrl(property.profileImage),
      bedroomImage: getFileUrl(property.bedroomImage),
      bathroomImage: getFileUrl(property.bathroomImage),
      otherImage: getFileUrl(property.otherImage),
      ownershipDocument: getFileUrl(property.ownershipDocument)
    };
    setSelectedProperty(propertyWithFullUrls);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const renderFilePreview = (fileUrl) => {
    if (!fileUrl) return null;
    
    const extension = fileUrl.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
    const isPDF = extension === 'pdf';
    const isDocument = ['doc', 'docx'].includes(extension);

    if (isImage) {
      return (
        <img 
          src={fileUrl} 
          alt="Document preview" 
          className="w-full h-48 object-cover rounded"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
      );
    } else if (isPDF) {
      return (
        <div className="bg-gray-100 p-4 rounded flex flex-col items-center justify-center h-48">
          <HiDocumentText className="text-4xl text-red-500 mb-2" />
          <span className="text-sm">PDF Document</span>
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 text-sm hover:underline"
          >
            View Full Document
          </a>
        </div>
      );
    } else if (isDocument) {
      return (
        <div className="bg-gray-100 p-4 rounded flex flex-col items-center justify-center h-48">
          <HiDocumentText className="text-4xl text-blue-500 mb-2" />
          <span className="text-sm">Word Document</span>
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 text-sm hover:underline"
          >
            Download Document
          </a>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-100 p-4 rounded flex flex-col items-center justify-center h-48">
          <HiDocumentText className="text-4xl text-gray-500 mb-2" />
          <span className="text-sm">Document</span>
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 text-sm hover:underline"
          >
            Download File
          </a>
        </div>
      );
    }
  };

  if (loading) return <div className="p-5 text-center">Loading properties...</div>;
  if (error) return <div className="p-5 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-5">My Properties</h2>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div className="flex items-center gap-2">
          <label className="font-medium">Filter:</label>
          <select
            className="p-2 text-sm rounded border border-gray-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Properties</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="rent">For Rent</option>
            <option value="sell">For Sale</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <button 
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm transition-colors whitespace-nowrap"
          onClick={() => navigate('/owner/addpropertyform')}
        >
          Add New Property
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse mt-5">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border-b-2 border-gray-200">Title</th>
              <th className="p-3 text-left border-b-2 border-gray-200">Type</th>
              <th className="p-3 text-left border-b-2 border-gray-200">Price</th>
              <th className="p-3 text-left border-b-2 border-gray-200">Status</th>
              <th className="p-3 text-left border-b-2 border-gray-200">Approval</th>
              <th className="p-3 text-left border-b-2 border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-5 text-center">
                  No properties found
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200">
                    <div className="font-medium">{property.title}</div>
                    <div className="text-xs text-gray-500">
                      {property.location?.city}, {property.location?.region}
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white ${
                      property.listingType === 'rent' ? 'bg-blue-500' : 'bg-purple-600'
                    }`}>
                      {property.listingType}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    ${property.price.toLocaleString()} {property.listingType === 'rent' ? '/month' : ''}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white ${
                      property.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white ${
                      property.approvalStatus === 'approved' ? 'bg-green-500' : 
                      property.approvalStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {property.approvalStatus}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <div className="flex gap-2">
                      <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                        onClick={() => handleViewDetails(property)}
                        title="View Details"
                      >
                        <FaEye size={14} />
                      </button>
                      <button 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                        onClick={() => handleEdit(property._id)}
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button 
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        onClick={() => handleDelete(property._id)}
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Property Details Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedProperty.title}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedProperty.location?.city}, {selectedProperty.location?.region}
                  </p>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Media Section */}
                <div>
                  <h4 className="font-semibold mb-3 border-b pb-2">Media</h4>
                  <div className="space-y-4">
                    {selectedProperty.profileImage && (
                      <div>
                        <p className="text-sm font-medium mb-1">Main Image</p>
                        {renderFilePreview(selectedProperty.profileImage)}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProperty.bedroomImage && (
                        <div>
                          <p className="text-sm font-medium mb-1">Bedroom</p>
                          {renderFilePreview(selectedProperty.bedroomImage)}
                        </div>
                      )}
                      {selectedProperty.bathroomImage && (
                        <div>
                          <p className="text-sm font-medium mb-1">Bathroom</p>
                          {renderFilePreview(selectedProperty.bathroomImage)}
                        </div>
                      )}
                      {selectedProperty.otherImage && (
                        <div>
                          <p className="text-sm font-medium mb-1">Other</p>
                          {renderFilePreview(selectedProperty.otherImage)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Documents Section */}
                  {selectedProperty.ownershipDocument && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3 border-b pb-2">Ownership Documents</h4>
                      <div className="bg-gray-50 p-4 rounded">
                        {renderFilePreview(selectedProperty.ownershipDocument)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div>
                  <h4 className="font-semibold mb-3 border-b pb-2">Property Details</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Type</p>
                        <p className="capitalize">{selectedProperty.listingType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Price</p>
                        <p>${selectedProperty.price.toLocaleString()} {selectedProperty.listingType === 'rent' ? '/month' : ''}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Size</p>
                        <p>{selectedProperty.size ? `${selectedProperty.size} sqft` : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Year Built</p>
                        <p>{selectedProperty.yearBuilt || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Bedrooms</p>
                        <p className="flex items-center gap-1">
                          <MdOutlineKingBed /> {selectedProperty.bedrooms}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Bathrooms</p>
                        <p className="flex items-center gap-1">
                          <MdOutlineBathtub /> {selectedProperty.bathrooms}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Condition</p>
                        <p className="capitalize">{selectedProperty.condition || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Available From</p>
                        <p className="flex items-center gap-1">
                          <MdDateRange /> {selectedProperty.availableFrom ? new Date(selectedProperty.availableFrom).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-sm mt-1">{selectedProperty.description || 'No description provided'}</p>
                    </div>

                    {/* Features */}
                    {selectedProperty.features?.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Features</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedProperty.features.map((feature, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Amenities */}
                    {selectedProperty.amenities && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Amenities</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                          {selectedProperty.amenities.parking && (
                            <div className="flex items-center gap-2">
                              <FaCar className="text-gray-600" />
                              <span>Parking</span>
                            </div>
                          )}
                          {selectedProperty.amenities.swimmingPool && (
                            <div className="flex items-center gap-2">
                              <FaSwimmingPool className="text-blue-500" />
                              <span>Swimming Pool</span>
                            </div>
                          )}
                          {selectedProperty.amenities.gym && (
                            <div className="flex items-center gap-2">
                              <FaDumbbell className="text-red-500" />
                              <span>Gym</span>
                            </div>
                          )}
                          {selectedProperty.amenities.wifi && (
                            <div className="flex items-center gap-2">
                              <FaWifi className="text-green-500" />
                              <span>WiFi</span>
                            </div>
                          )}
                          {selectedProperty.amenities.security && (
                            <div className="flex items-center gap-2">
                              <FaShieldAlt className="text-yellow-500" />
                              <span>Security</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Status Section */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white ${
                          selectedProperty.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {selectedProperty.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Approval</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white ${
                          selectedProperty.approvalStatus === 'approved' ? 'bg-green-500' : 
                          selectedProperty.approvalStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                          {selectedProperty.approvalStatus}
                        </span>
                        {selectedProperty.rejectionReason && (
                          <p className="text-xs text-red-500 mt-1">
                            Reason: {selectedProperty.rejectionReason}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-500">Views</p>
                        <p className="text-lg font-bold">{selectedProperty.views || 0}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-500">Inquiries</p>
                        <p className="text-lg font-bold">{selectedProperty.inquiries || 0}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-500">Bookings</p>
                        <p className="text-lg font-bold">{selectedProperty.acceptedBookings || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerPropertyManager;