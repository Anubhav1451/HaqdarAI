const { GoogleGenerativeAI } = require('@google/genai');
const Scheme = require('../models/Scheme');

/**
 * AI Controller
 * 
 * Processes unstructured user queries using Google Gemini AI to extract
 * demographic parameters and query the database for matching schemes.
 */

const processUnstructuredQuery = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Query is required'
      });
    }

    // Initialize Google Gen AI SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // System prompt for extraction
    const systemPrompt = 'You are the extraction engine for Haqdar AI. Analyze the citizen\'s query and extract their demographic parameters. You must return ONLY a raw, clean JSON object. Do not wrap it in markdown code blocks or backticks. Schema: { age: Number or null, income: Number or null, state: String or "All", profession: String or "All" }';

    // Send query to Gemini
    const prompt = `${systemPrompt}\n\nUser Query: ${query}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Parse JSON response
    let extractedParams;
    try {
      // Clean the response text to remove any markdown code blocks
      const cleanText = responseText.replace(/```json\n?|\n?```/g, '').trim();
      extractedParams = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return res.status(500).json({
        success: false,
        error: 'Failed to parse AI response'
      });
    }

    // Build MongoDB query based on extracted parameters
    const queryObj = {};

    // Income filter
    if (extractedParams.income) {
      queryObj.maxIncome = { $gte: extractedParams.income };
    }

    // Age filter
    if (extractedParams.age) {
      queryObj.minAge = { $lte: extractedParams.age };
      queryObj.$or = [
        { maxAge: { $gte: extractedParams.age } },
        { maxAge: null },
        { maxAge: { $exists: false } }
      ];
    }

    // State filter
    if (extractedParams.state && extractedParams.state !== 'All') {
      queryObj.$or = queryObj.$or || [];
      queryObj.$or.push(
        { allowedStates: 'All' },
        { allowedStates: { $in: [extractedParams.state, extractedParams.state.toLowerCase()] } },
        { allowedStates: { $in: ['All', extractedParams.state, extractedParams.state.toLowerCase()] } }
      );
    }

    // Profession filter
    if (extractedParams.profession && extractedParams.profession !== 'All') {
      queryObj.$or = queryObj.$or || [];
      queryObj.$or.push(
        { allowedProfessions: 'All' },
        { allowedProfessions: { $in: [extractedParams.profession, extractedParams.profession.toLowerCase()] } },
        { allowedProfessions: { $in: ['All', extractedParams.profession, extractedParams.profession.toLowerCase()] } }
      );
    }

    // Execute query
    const schemes = await Scheme.find(queryObj);

    res.status(200).json({
      success: true,
      extractedParams,
      count: schemes.length,
      data: schemes
    });
  } catch (error) {
    console.error('Error processing AI query:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error while processing AI query'
    });
  }
};

module.exports = {
  processUnstructuredQuery
};
