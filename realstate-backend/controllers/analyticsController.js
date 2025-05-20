const Property = require("../models/Property");

// Static Analytics

exports.priceTrends = async (req, res) => {
  try {
    const data = await Analytics.priceTrends();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.priceByLocation = async (req, res) => {
  try {
    const data = await Analytics.priceByLocation();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.popularPropertyTypes = async (req, res) => {
  try {
    const data = await Analytics.popularPropertyTypes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listingsByLocation = async (req, res) => {
  try {
    const data = await Analytics.listingsByLocation();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dynamic Owner Analytics
exports.getOwnerAnalytics = async (req, res) => {
  const ownerId = req.params.ownerId;

  try {
    const properties = await Property.find({ owner: ownerId });

    const totalProperties = properties.length;
    const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalInquiries = properties.reduce((sum, p) => sum + (p.inquiries || 0), 0);
    const totalAcceptedBookings = properties.reduce((sum, p) => sum + (p.acceptedBookings || 0), 0);
    const totalEarnings = properties.reduce((sum, p) => sum + (p.earnings || 0), 0);

    const chartData = properties.map((p) => ({
      name: p.title || "Property",
      views: p.views || 0,
      earnings: p.earnings || 0,
    }));

    res.json({
      totalProperties,
      totalViews,
      totalInquiries,
      totalAcceptedBookings,
      totalEarnings,
      chartData,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch owner analytics" });
  }
};
