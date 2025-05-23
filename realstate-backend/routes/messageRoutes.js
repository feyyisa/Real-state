const express = require('express');
const router = express.Router();

const {
  submitContactForm,
  getContactMessages,
  respondToMessage,
  deleteMessage,
  getMessagesByUserEmail // ✅ Import this
} = require('../controllers/messageController'); // Make sure it's exported there

const { validateContactSubmission } = require('../middleware/validateContact');

router.post('/', validateContactSubmission, submitContactForm);
router.get('/', getContactMessages);
router.put('/respond/:id', respondToMessage);
router.delete('/delete/:id', deleteMessage);
router.get('/user/:email', getMessagesByUserEmail); // ✅ Use it

module.exports = router;
