// services/emailService.js
const nodemailer = require('nodemailer');
const { email } = require('../config'); // Import email config

const transporter = nodemailer.createTransport(email);

// Example email sending function
const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = {
    sendEmail
};