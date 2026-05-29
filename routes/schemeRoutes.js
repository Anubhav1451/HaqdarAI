const express = require('express');
const router = express.Router();
const { getFilteredSchemes } = require('../controllers/schemeController');

/**
 * Scheme Routes
 * 
 * Clean route separation linking to controller functions.
 * GET /api/schemes - Get filtered schemes based on user criteria
 */

router.get('/', getFilteredSchemes);

module.exports = router;
