const Property = require("../models/Property");
const User = require("../models/User");
const Booking = require("../models/Booking");

const getAnalytics = async (req, res) => {
  try {
    const user = req.user;
    const role = user.role;

    if (role === "admin") {
      // User counts
      const totalCustomers = await User.countDocuments({ role: 'customer' });
      const totalOwners = await User.countDocuments({ role: 'owner' });
      
      // Property status counts
      const totalProperties = await Property.countDocuments();
      const approvedProperties = await Property.countDocuments({ approvalStatus: 'approved' });
      const rejectedProperties = await Property.countDocuments({ approvalStatus: 'rejected' });
      const pendingProperties = await Property.countDocuments({ approvalStatus: 'pending' });
      
      // Property transaction counts based on status and listingType
      const soldProperties = await Property.countDocuments({ 
        status: 'booked',
        listingType: 'sell'
      });
      
      const rentedProperties = await Property.countDocuments({ 
        status: 'booked',
        listingType: 'rent'
      });
      
      const availableProperties = await Property.countDocuments({ 
        status: 'available' 
      });

      // Financials
      const totalEarningsAgg = await Booking.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]);
      const totalEarnings = totalEarningsAgg[0]?.total || 0;

      return res.json({
        role: "admin",
        totalCustomers,
        totalOwners,
        totalProperties,
        approvedProperties,
        rejectedProperties,
        pendingProperties,
        totalSoldProperties: soldProperties,
        totalRentedProperties: rentedProperties,
        availableProperties,
        totalEarnings
      });
    }
    else if (role === "owner") {
      const ownerId = user._id;
      
      // Owner's property status counts
      const totalProperties = await Property.countDocuments({ owner: ownerId });
      const approvedProperties = await Property.countDocuments({ 
        owner: ownerId, 
        approvalStatus: 'approved' 
      });
      const rejectedProperties = await Property.countDocuments({ 
        owner: ownerId, 
        approvalStatus: 'rejected' 
      });
      const pendingProperties = await Property.countDocuments({ 
        owner: ownerId, 
        approvalStatus: 'pending' 
      });
      
      // Owner's property transaction counts based on status and listingType
      const soldProperties = await Property.countDocuments({ 
        owner: ownerId,
        status: 'booked',
        listingType: 'sell'
      });
      
      const rentedProperties = await Property.countDocuments({ 
        owner: ownerId,
        status: 'booked',
        listingType: 'rent'
      });
      
      // Owner's booking counts
      const propertyIds = (await Property.find({ owner: ownerId }).select('_id'))
        .map(p => p._id);
      
      const totalSoldBookings = await Booking.countDocuments({ 
        property: { $in: propertyIds },
        transactionType: 'sale',
        status: 'completed'
      });
      
      const totalRentedBookings = await Booking.countDocuments({ 
        property: { $in: propertyIds },
        transactionType: 'rent',
        status: 'completed'
      });
      
      const availableProperties = await Property.countDocuments({ 
        owner: ownerId,
        status: 'available' 
      });

      // Owner's earnings
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
        totalProperties,
        approvedProperties,
        rejectedProperties,
        pendingProperties,
        totalSoldProperties: soldProperties,
        totalRentedProperties: rentedProperties,
        totalSoldBookings,
        totalRentedBookings,
        availableProperties,
        totalEarnings
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