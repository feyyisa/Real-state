const mongoose = require('mongoose');

const userManageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Admin', 'owner', 'customer'], required: true }
});

// Set the collection name explicitly to 'usermanage'
module.exports = mongoose.model('UserManage', userManageSchema, 'usermanage');
