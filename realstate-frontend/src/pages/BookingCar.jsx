import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { message, Button, Checkbox, DatePicker, Select } from "antd";
import axios from "axios";

const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingCar = () => {
  const { carid } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [driverRequired, setDriverRequired] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");

  const [isAvailable, setIsAvailable] = useState(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const DRIVER_FEE = 1000;
  const [from, to] = selectedDates;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          http://localhost:5000/api/cars/getcar/${carid}
        );
        if (!response.ok) throw new Error("Failed to fetch car details!");
        const data = await response.json();
        setCar(data);
        setTotalPrice(data.rentPerDay);
      } catch (error) {
        console.error(error);
        message.error("Error fetching car details.");
      }
    };

    fetchCarDetails();
  }, [carid]);

  useEffect(() => {
    const basePrice = driverRequired ? totalPrice + DRIVER_FEE : totalPrice;
    setTotalAmount(basePrice);
  }, [totalPrice, driverRequired]);

  const handleDateChange = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      setSelectedDates(dateStrings);
      const start = new Date(dateStrings[0]);
      const end = new Date(dateStrings[1]);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalPrice(diffDays * (car?.rentPerDay  0));
    } else {
      setSelectedDates([]);
      setTotalPrice(car?.rentPerDay  0);
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
      message.warning("You must log in first.");
      navigate("/login");
      return;
    }

    if (!validateBooking()) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/bookings/bookcar",
        {
          totalAmount,
          car: car._id,
          bookedTimeSlots: [{ from: selectedDates[0], to: selectedDates[1] }],
          user: user._id,
          driverRequired,
          email: user.email,
          first_name: user.username,
          phone_number: user.phone || "0912345678",
        }
      );

      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Payment initiation failed:", error);
      message.error("Failed to initiate Chapa payment.");
    }
  };

  const validateBooking = () => {
    if (!selectedDates.length) {
      message.error("Please select your booking dates first.");
      return false;
    }
    if (!pickupLocation) {
      message.error("Please select a pickup location.");
      return false;
    }
    return true;
  };
  const fetchAvailability = async () => {
    try {
      const res = await axios.get(
        http://localhost:8000/api/bookings/car-availability/${carid}
      );
      setIsAvailable(res.data.available);
      setAvailabilityChecked(true);
    } catch (err) {
      console.error("Error fetching availability", err);
      message.error("Failed to check availability.");
    }
  };

  if (!car) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">Car not found</h1>
        <p>No car found with ID: {carid}</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Car Details */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{car.name}</h2>
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-72 object-cover rounded-lg shadow-lg mb-6"
          />
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Fuel Type:</strong> {car.fuelType}
            </p>
            <p>
              <strong>Capacity:</strong> {car.capacity} persons
            </p>
            <p>
              <strong>Price Per Day:</strong> ${car.rentPerDay}
            </p>
          </div>
        </div>

        {/* Booking Form */}
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
            <label className="block font-semibold mb-1">Pickup Location</label>
            <Select
              className="w-full"
              placeholder="Select Pickup Location"
              value={pickupLocation}
              onChange={(value) => setPickupLocation(value)}
            >
              <Option value="Addis Ababa">Addis Ababa</Option>
              <Option value="Adama">Adama</Option>
              <Option value="Hawassa">Hawassa</Option>
            </Select>
          </div>

          <div className="flex items-center mb-4">
            <Checkbox
              checked={driverRequired}
              onChange={(e) => setDriverRequired(e.target.checked)}
            >
              Need a driver? (+1000 ETB)
            </Checkbox>
          </div>

          {selectedDates.length > 0 && (
            <div className="space-y-2 text-gray-800 mb-4">
              <p>
                <strong>From:</strong> {formatDate(from)}
              </p>
              <p>
                <strong>To:</strong> {formatDate(to)}
              </p>
              <p>
                <strong>Base Price:</strong> ${totalPrice.toFixed(2)}
              </p>
              <p className="text-green-600 font-bold">
                Total: ${totalAmount.toFixed(2)}
              </p>
            </div>
          )}

          {/* Availability Check Button */}
          <Button type="default" className="mt-4" onClick={fetchAvailability}>
            Check Availability Now
          </Button>

          {availabilityChecked && (
            <div
              className={`mt-4 p-4 rounded-lg text-white text-center font-semibold ${
                isAvailable ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {isAvailable
                ? "✅ This car is currently AVAILABLE."
                : "❌ This car is currently OCCUPIED."}
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

export default BookingCar;