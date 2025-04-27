// config/emailConfig.js
module.exports = {
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER, // Make sure to set these in your .env
      pass: process.env.EMAIL_PASS
    }
  };