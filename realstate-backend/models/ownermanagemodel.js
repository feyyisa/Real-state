const mongoose = require('mongoose');

const ownerManageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  properties: { type: Number, default: 0 }
});

module.exports = mongoose.model('OwnerManage', ownerManageSchema);
