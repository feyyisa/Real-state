import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Button, Form, Upload, Checkbox } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import chapaLogo from '../../assets/chapa-logo.jpg';
import {jwtDecode} from 'jwt-decode'; // Add this import


const BookingHouse = () => {
  const { id: propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [commission, setCommission] = useState(0);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${propertyId}`);
        setProperty(res.data);
        // Calculate commission based on property price (2%)
        const commissionAmount = res.data.price * 0.02;
        setTotalAmount(res.data.price);
        setCommission(commissionAmount);
      } catch (err) {
        console.error(err);
        message.error("Error fetching property details.");
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

const handleSubmit = async () => {
  if (!user) {
    message.warning("Please log in first.");
    navigate("/login");
    return;
  }

  if (fileList.length === 0) {
    message.error("Please upload your ID card");
    return;
  }

  try {
    setLoading(true);
    
    // Decode the JWT token to get user ID
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('property', propertyId);
    formData.append('type', property.listingType);
    formData.append('totalPrice', String(totalAmount + commission));
    formData.append('bookedBy', userId); // Use decoded ID
    formData.append('bookerIdCardFile', fileList[0].originFileObj);
    
    // Create the booking and get payment URL from backend
    const response = await axios.post(
      'http://localhost:5000/api/bookings/book', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    // Redirect to payment URL provided by backend
    window.location.href = response.data.paymentUrl;

  } catch (error) {
    console.error(error);
    message.error("Booking failed: " + (error.response?.data?.message || error.message));
  } finally {
    setLoading(false);
  }
};

  if (!property) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">Loading property details...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-4">{property.title}</h2>
          <img
            src={`http://localhost:5000/uploads/${property.profileImage}`}
            alt={property.title}
            className="w-full h-72 object-cover rounded-lg shadow-lg mb-6"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Property+Image';
            }}
          />
          <div className="space-y-2 text-gray-700 mb-6">
            <p>
              <strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${
                property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {property.status.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>Location:</strong> {property.location?.city}, {property.location?.region}
            </p>
            <p>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p>
              <strong>Bathrooms:</strong> {property.bathrooms}
            </p>
            <p>
              <strong>Price:</strong> {new Intl.NumberFormat('en-ET', {
                style: 'currency',
                currency: 'ETB'
              }).format(property.price)}
            </p>
            <p>
              <strong>Commission (2%):</strong> {new Intl.NumberFormat('en-ET', {
                style: 'currency',
                currency: 'ETB'
              }).format(commission)}
            </p>
            <p className="text-lg font-bold">
              <strong>Total:</strong> {new Intl.NumberFormat('en-ET', {
                style: 'currency',
                currency: 'ETB'
              }).format(totalAmount + commission)}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Booking & Payment</h3>
          
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="ID Card Upload"
              name="idCard"
              rules={[{ required: true, message: 'Please upload your ID card!' }]}
            >
              <Upload
                fileList={fileList}
                onChange={handleUpload}
                beforeUpload={() => false}
                accept="image/*,.pdf"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('You must accept the agreement'),
                },
              ]}
            >
              <Checkbox>
                I agree to the 2% commission fee and understand this payment is non-refundable
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full mt-6 h-12"
                style={{
                  backgroundColor: '#0c1a35',
                  borderColor: '#1D4ED8',
                }}
                loading={loading}
                disabled={property.status !== 'available'}
              >
                <div className="flex items-center justify-center gap-2">
                  <img src={chapaLogo} alt="Chapa" className="h-10" />
                  <span className="text-white font-medium">Pay & Book with Chapa</span>
                </div>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BookingHouse;