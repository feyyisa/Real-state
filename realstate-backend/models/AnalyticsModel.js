const mongoose = require("mongoose");
const Property = require("./Property");

// Aggregating property prices over time (e.g., by month)
const priceTrends = async () => {
  return await Property.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        avgPrice: { $avg: "$price" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

// Aggregating price by city
const priceByLocation = async () => {
  return await Property.aggregate([
    {
      $group: {
        _id: "$location.city",
        avgPrice: { $avg: "$price" },
      },
    },
  ]);
};

// Popular property types
const popularPropertyTypes = async () => {
  return await Property.aggregate([
    {
      $group: {
        _id: "$propertyType",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

// Listings by location (count of properties per city)
const listingsByLocation = async () => {
  return await Property.aggregate([
    {
      $group: {
        _id: "$location.city",
        count: { $sum: 1 },
      },
    },
  ]);
};

// (Optional) Visits per listing
const visitsPerListing = async () => {
  return await Property.aggregate([
    {
      $project: {
        title: 1,
        views: 1,
      },
    },
  ]);
};

module.exports = {
  priceTrends,
  priceByLocation,
  popularPropertyTypes,
  listingsByLocation,
  visitsPerListing,
};
