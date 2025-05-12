import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { message, Button, DatePicker, Select } from "antd";
import axios from "axios";

const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingHouse = () => {
  const { houseid } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [from, to] = selectedDates;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/houses/gethouse/${houseid}`);
        if (!res.ok) throw new Error("Failed to fetch house details!");
        const data = await res.json();
        setHouse(data);
      } catch (err) {
        console.error(err);
        message.error("Error fetching house details.");
      }
    };

    fetchHouseDetails();
  }, [houseid]);

  useEffect(() => {
    if (selectedDates.length === 2 && house) {
  const start = new Date(selectedDates[0]);
  const end = new Date(selectedDates[1]);
  const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const total = diffDays * house.price; // Assuming `price` means per-day rent
  setTotalAmount(total);
}

  }, [selectedDates, house]);

  const handleDateChange = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      setSelectedDates(dateStrings);
    } else {
      setSelectedDates([]);
      setTotalAmount(0);
    }
  };

  const disabledDate = (current) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const loadChapaSDK = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.chapa.co/hosted/pay.js";
      script.async = true;
      script.onload = () => console.log("Chapa SDK loaded");
      document.body.appendChild(script);
    };
    loadChapaSDK();
  }, []);

  const handleChapaPayment = async () => {
    if (!user) {
      message.warning("Please log in first.");
      navigate("/login");
      return;
    }

    if (!selectedDates.length || !location) {
      message.error("Please complete all booking details.");
      return;
    }

  const handleBooking = async () => {
  try {
    const response = await axios.post(`http://localhost:5000/api/bookings`, {
      propertyId: houseid,
      userId: user._id,
      from: selectedDates[0],
      to: selectedDates[1],
      amount: totalAmount,
    });
    message.success("Booking successful!");
    navigate("/mybookings");
  } catch (error) {
    console.error(error);
    message.error("Booking failed");
  }
};

  };

  const fetchAvailability = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/house-availability/${houseid}`);
      setIsAvailable(res.data.available);
      setAvailabilityChecked(true);
    } catch (err) {
      console.error("Error fetching availability", err);
      message.error("Availability check failed.");
    }
  };

  if (!house) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">House not found</h1>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-4">{house.name}</h2>
          <img
            src={house.image}
            alt={house.name}
            className="w-full h-72 object-cover rounded-lg shadow-lg mb-6"
          />
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Location:</strong> {house.location}
            </p>
            <p>
              <strong>Bedrooms:</strong> {house.bedrooms}
            </p>
            <p>
              <strong>Price Per Day:</strong> ${house.rentPerDay}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Booking Details</h3>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Select Dates</label>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="MMM DD, YYYY HH:mm"
              onChange={handleDateChange}
              disabledDate={disabledDate}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Select Location</label>
            <Select
              className="w-full"
              placeholder="Choose Location"
              value={location}
              onChange={(value) => setLocation(value)}
            >
              <Option value="Addis Ababa">Addis Ababa</Option>
              <Option value="Adama">Adama</Option>
              <Option value="Hawassa">Hawassa</Option>
            </Select>
          </div>

          {selectedDates.length > 0 && (
            <div className="space-y-2 text-gray-800 mb-4">
              <p><strong>From:</strong> {formatDate(from)}</p>
              <p><strong>To:</strong> {formatDate(to)}</p>
              <p className="text-green-600 font-bold">Total: ${totalAmount.toFixed(2)}</p>
            </div>
          )}

          <Button type="default" className="mt-4" onClick={fetchAvailability}>
            Check Availability
          </Button>

          {availabilityChecked && (
            <div
              className={`mt-4 p-4 rounded-lg text-white text-center font-semibold ${
                isAvailable ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {isAvailable ? "✅ House is AVAILABLE" : "❌ House is OCCUPIED"}
            </div>
          )}

          <Button
            type="primary"
            className="w-full mt-6"
            onClick={handleChapaPayment}
            disabled={availabilityChecked && !isAvailable}
          >
            Pay and Book with Chapa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingHouse;
