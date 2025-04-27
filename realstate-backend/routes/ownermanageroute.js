const express = require('express');
const router = express.Router();
const {
  getAllOwners,
  createOwner,
  updateOwner,
  deleteOwner,
} = require('../controllers/ownermanagecontroller');

router.get('/', getAllOwners);
router.post('/', createOwner);
router.put('/:id', updateOwner);
router.delete('/:id', deleteOwner);

module.exports = router;
