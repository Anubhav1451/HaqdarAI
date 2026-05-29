const express = require('express');
const router = express.Router();
const { processUnstructuredQuery } = require('../controllers/aiController');

/**
 * AI Routes
 * 
 * Routes for AI-powered query processing.
 * POST /api/ai/process-query - Process unstructured user queries
 */

router.post('/process-query', processUnstructuredQuery);

module.exports = router;
