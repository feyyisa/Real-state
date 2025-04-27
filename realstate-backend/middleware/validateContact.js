// middleware/validateContact.js
// middleware/validateContact.js
const { body } = require('express-validator');

exports.validateContactSubmission = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
];
const validateContactSubmission = (req, res, next) => {
    // Your validation logic for contact form submission
    next();
};

const validatePagination = (req, res, next) => {
    // Your validation logic for pagination
    next();
};

module.exports = {
    validateContactSubmission,
    validatePagination
};