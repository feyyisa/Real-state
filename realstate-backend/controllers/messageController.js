const Contact = require('../models/messageModel');

// Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({ success: true, message: 'Contact submitted', data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Submission failed', error: error.message });
  }
};

// Get all messages
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages', error: error.message });
  }
};

// ✅ Respond to a message
exports.respondToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { response },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, message: "Response sent", data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to respond", error: error.message });
  }
};

// ✅ Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed", error: error.message });
  }
};
exports.getMessagesByUserEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const messages = await Contact.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user messages', error: error.message });
  }
};
