const express = require('express');
const router = express.Router();
const { processUnstructuredQuery, getLiveSchemes } = require('../controllers/aiController');

/**
 * AI Routes
 * 
 * Routes for AI-powered query processing.
 * POST /api/ai/process-query - Process unstructured user queries
 * POST /api/ai/live-schemes - Get live schemes using Gemini AI
 */

router.post('/process-query', processUnstructuredQuery);
router.post('/live-schemes', getLiveSchemes);

module.exports = router;
