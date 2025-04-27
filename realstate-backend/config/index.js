const { connectDB, closeDB } = require('./db');
const emailConfig = require('./emailConfig');

module.exports = {
  connectDB,
  closeDB,
  email: emailConfig
};