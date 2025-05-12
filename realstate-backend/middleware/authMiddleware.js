const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you have a User model
const JWT_SECRET = process.env.JWT_SECRET || '12hsgehfvsdr78438rgbskjbfew7ry';

// Authenticate user by token
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Extract token from header

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Verify the token with secret
    req.user = decoded;  // Attach decoded data (user info) to the request object
    next();  // Proceed to next middleware or route handler
  } catch (err) {
    console.error('JWT Error:', err.message);
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

// Role-based authorization
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ success: false, message: `${role} access required` });
    }
    next();  // User has the correct role, proceed to the next middleware or route handler
  };
};

const authorizeAdmin = authorizeRole('admin');
const authorizeOwner = authorizeRole('owner');
const authorizeCustomer = authorizeRole('customer');

// Protect route for token verification and user data (if needed)
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];  // Extract token from Bearer

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Verify the token
    req.user = await User.findById(decoded.id).select('-password');  // Attach user data to req
    next();  // Proceed to the next middleware
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
  authorizeOwner,
  authorizeCustomer,
  protect,  // Export the protect middleware
};
