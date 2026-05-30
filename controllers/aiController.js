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

    // Input validation
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Query is required'
      });
    }

    // Validate query length
    if (typeof query !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Query must be a string'
      });
    }

    if (query.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Query must be at least 3 characters long'
      });
    }

    if (query.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Query must not exceed 500 characters'
      });
    }

    // Sanitize query - remove potential injection patterns
    const dangerousPatterns = [
      /ignore previous instructions/i,
      /ignore all instructions/i,
      /system:/i,
      /assistant:/i,
      /user:/i,
      /<script/i,
      /javascript:/i,
      /eval\(/i,
      /__proto__/i,
      /constructor/i
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(query)) {
        return res.status(400).json({
          success: false,
          error: 'Query contains invalid characters or patterns'
        });
      }
    }

    // Initialize Google Gen AI SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // System prompt for extraction
    const systemPrompt = 'You are the extraction engine for Haqdar AI. Analyze the citizen\'s query and extract their demographic parameters. You must return ONLY a raw, clean JSON object. Do not wrap it in markdown code blocks or backticks. Schema: { age: Number or null, income: Number or null, state: String or "All", profession: String or "All" }';

    // Send query to Gemini with delimiters to prevent prompt injection
    const prompt = `${systemPrompt}\n\n[USER_INPUT_START]\n${query}\n[USER_INPUT_END]`;
    const result = await model.generateContent(prompt, {
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.1
      }
    });
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

const getLiveSchemes = async (req, res) => {
  try {
    const { age, gender, income, profession, state } = req.body;

    // Input validation
    if (!age && !income && !profession && !state) {
      return res.status(400).json({
        success: false,
        error: 'At least one demographic parameter is required'
      });
    }

    // Initialize Google Gen AI SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // System prompt for live scheme search
    const systemPrompt = `You are the core intelligence of Haqdar AI. Analyze the user's profile and instantly find 5 to 7 REAL, active Indian Government welfare schemes they qualify for. Return the output strictly as a valid raw JSON array containing these fields: id, name, ministry, description, benefits (array), eligibility_reason, official_url. The official_url field MUST contain a valid, real government website URL (e.g., https://pmkisan.gov.in/, https://pmaymis.gov.in/, https://www.myscheme.gov.in/). Do not leave official_url blank or null. Do not include markdown backticks or explanations.`;

    // Build user profile string
    const userProfile = `User Profile:
- Age: ${age || 'Not specified'}
- Gender: ${gender || 'Not specified'}
- Annual Income: ₹${income || 'Not specified'}
- Profession: ${profession || 'Not specified'}
- State: ${state || 'Not specified'}`;

    // Send profile to Gemini
    const prompt = `${systemPrompt}\n\n${userProfile}`;
    const result = await model.generateContent(prompt, {
      generationConfig: {
        maxOutputTokens: 2000,
        temperature: 0.7
      }
    });
    const response = await result.response;
    const responseText = response.text();

    // Parse JSON response
    let schemes;
    try {
      // Clean the response text to remove any markdown code blocks
      const cleanText = responseText.replace(/```json\n?|\n?```/g, '').trim();
      schemes = JSON.parse(cleanText);
      
      // Ensure it's an array
      if (!Array.isArray(schemes)) {
        throw new Error('Response is not an array');
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return res.status(500).json({
        success: false,
        error: 'Failed to parse AI response'
      });
    }

    res.status(200).json({
      success: true,
      count: schemes.length,
      data: schemes
    });
  } catch (error) {
    console.error('Error getting live schemes:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error while fetching live schemes'
    });
  }
};

module.exports = {
  processUnstructuredQuery,
  getLiveSchemes
};
