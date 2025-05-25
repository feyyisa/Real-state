const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Public routes for announcements
router.get('/', announcementController.getAllAnnouncements);
router.post('/', announcementController.createAnnouncement);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;
