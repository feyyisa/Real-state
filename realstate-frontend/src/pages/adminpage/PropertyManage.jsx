import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaEye, FaCar, FaSwimmingPool, FaDumbbell, FaWifi, FaShieldAlt } from 'react-icons/fa';
import { MdOutlineKingBed, MdOutlineBathtub, MdDateRange } from 'react-icons/md';

const SERVER_URL = 'http://localhost:5000';

const PropertyManage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/properties`);
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`${SERVER_URL}/api/properties/approve-reject/${id}`, {
        approvalStatus: 'approved'
      });
      updatePropertyStatus(id, 'approved');
      console.log('Property approved:', response.data);
      alert
    } catch (error) {
      console.error('Error approving property:', error);
      alert('Error approving property. Please try again.');
    }
  };

  const handleReject = async (id) => {
    if (!rejectionReason) {
      alert('Please enter a rejection reason');
      return;
    }

    try {
      const response = await axios.put(`${SERVER_URL}/api/properties/approve-reject/${id}`, {
        approvalStatus: 'rejected',
        rejectionReason
      });
      updatePropertyStatus(id, 'rejected', rejectionReason);
      setRejectionReason('');
      console.log('Property rejected:', response.data);
      alert('Property rejected successfully');
    } catch (error) {
      console.error('Error rejecting property:', error);
      alert('Error rejecting property. Please try again.');
    }
  };

  const updatePropertyStatus = (id, status, reason = '') => {
    setProperties(properties.map(property => {
      if (property._id === id) {
        return {
          ...property,
          approvalStatus: status,
          rejectionReason: reason
        };
      }
      return property;
    }));
  };

  const openModal = (property) => {
    setSelectedProperty(property);
    console.log('Selected Property:', property.owner);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const renderFilePreview = (fileUrl) => {
    if (!fileUrl) return null;
    
    const isImage = fileUrl.match(/\.(jpeg|jpg|gif|png)$/) !== null;
    
    return (
      <div className="border rounded p-2">
        {isImage ? (
          <img 
            src={fileUrl.startsWith('http') ? fileUrl : `${SERVER_URL}/uploads/${fileUrl}`} 
            alt="Property" 
            className="w-full h-32 object-cover"
          />
        ) : (
          <a 
            href={fileUrl.startsWith('http') ? fileUrl : `${SERVER_URL}/uploads/${fileUrl}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Document
          </a>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Property Management</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{property.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 capitalize">{property.listingType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Intl.NumberFormat('en-ET', {
                        style: 'currency',
                        currency: 'ETB'
                      }).format(property.price)}
                      {property.listingType === 'rent' ? '/month' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {property.location?.city}, {property.location?.region}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' : 
                      property.approvalStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {property.approvalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(property)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleApprove(property._id)}
                        className="text-green-600 hover:text-green-900"
                        title="Approve"
                        disabled={property.approvalStatus === 'approved'}
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProperty(property);
                          setRejectionReason('');
                          document.getElementById('rejectModal').showModal();
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Reject"
                        disabled={property.approvalStatus === 'rejected'}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Reason Modal */}
      <dialog id="rejectModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Reject Property</h3>
          <p className="py-4">Please provide a reason for rejecting this property:</p>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter rejection reason..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-2" onClick={() => document.getElementById('rejectModal').close()}>
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  handleReject(selectedProperty._id);
                  document.getElementById('rejectModal').close();
                }}
              >
                Confirm Reject
              </button>
            </form>
          </div>
        </div>
      </dialog>

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
                        <p>
                          {new Intl.NumberFormat('en-ET', {
                            style: 'currency',
                            currency: 'ETB'
                          }).format(selectedProperty.price)}
                          {selectedProperty.listingType === 'rent' ? '/month' : ''}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Size</p>
                        <p>{selectedProperty.size ? `${selectedProperty.size} sqm` : 'N/A'}</p>
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

                    {/* Owner Information */}
                    {selectedProperty.owner && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold mb-3">Owner Information</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Name</p>
                            <p>{selectedProperty.owner.name || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p>{selectedProperty.owner.email || 'N/A'}</p>
                          </div>
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

export default PropertyManage;