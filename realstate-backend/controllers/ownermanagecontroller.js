const Owner = require('../models/ownermanagemodel');

// Get all owners
exports.getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new owner
exports.createOwner = async (req, res) => {
  const { name, email, properties } = req.body;
  try {
    const owner = new Owner({ name, email, properties });
    await owner.save();
    res.status(201).json(owner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update owner
exports.updateOwner = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Owner.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete owner
exports.deleteOwner = async (req, res) => {
  const { id } = req.params;
  try {
    await Owner.findByIdAndDelete(id);
    res.status(200).json({ message: 'Owner deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
