const Property = require("../models/Property");
const User = require("../models/User");
const Booking = require("../models/Booking");

const getAnalytics = async (req, res) => {
  try {
    const user = req.user;
    const role = user.role;

    if (role === "admin") {
      const totalUsers = await User.countDocuments();
      const totalProperties = await Property.countDocuments();
      const totalBookings = await Booking.countDocuments({ status: 'confirmed' });
      const totalEarningsAgg = await Booking.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]);
      const totalEarnings = totalEarningsAgg[0]?.total || 0;
      const pendingApprovals = await Property.countDocuments({ approvalStatus: "pending" });

      return res.json({
        role: "admin",
        totalUsers,
        totalProperties,
        totalBookings,
        totalEarnings,
        pendingApprovals,
      });
    }
    else if (role === "owner") {
      const ownerId = user._id;
      const ownerProperties = await Property.find({ owner: ownerId }).select('_id approvalStatus');
      const propertyIds = ownerProperties.map(p => p._id);
      const pendingProperties = ownerProperties.filter(p => p.approvalStatus === "pending").length;

      const totalBookings = await Booking.countDocuments({ 
        property: { $in: propertyIds },
        status: 'confirmed'
      });

      const totalEarningsAgg = await Booking.aggregate([
        { $match: {
          property: { $in: propertyIds },
          paymentStatus: 'paid'
        }},
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]);
      const totalEarnings = totalEarningsAgg[0]?.total || 0;

      return res.json({
        role: "owner",
        propertyCount: ownerProperties.length,
        totalBookings,
        totalEarnings,
        pendingProperties,
      });
    }

    else {
      return res.status(403).json({ error: "Access denied: unsupported role." });
    }
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { getAnalytics };
