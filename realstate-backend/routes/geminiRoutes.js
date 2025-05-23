const express = require('express');
const { handleRealEstateQuery } = require('../controllers/realEstateController'); // ← Correct path

const router = express.Router();

router.post('/real-estate-query', handleRealEstateQuery);

module.exports = router;
