const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Schemes Data
const schemesData = [
  {
    title: 'PM Kisan',
    description: 'Pradhan Mantri Kisan Samman Nidhi - Income support for farmers',
    minAge: 18,
    maxAge: 100,
    maxIncome: 300000,
    genderEligibility: ['all'],
    casteEligibility: ['all'],
    stateEligibility: ['central'],
    benefits: '₹6,000 per year in three installments',
    occupation: 'Farmer'
  },
  {
    title: 'Mudra Yojana',
    description: 'Pradhan Mantri Mudra Yojana - Loans for small businesses',
    minAge: 18,
    maxAge: 65,
    maxIncome: 1000000,
    genderEligibility: ['all'],
    casteEligibility: ['all'],
    stateEligibility: ['central'],
    benefits: 'Loans up to ₹10 lakh for micro enterprises',
    occupation: 'Business'
  },
  {
    title: 'Post-Matric Scholarship',
    description: 'Post-Matric Scholarship for SC Students - Financial assistance for education',
    minAge: 15,
    maxAge: 30,
    maxIncome: 250000,
    genderEligibility: ['all'],
    casteEligibility: ['sc'],
    stateEligibility: ['all'],
    benefits: 'Full tuition fee reimbursement and monthly allowance',
    occupation: 'Student'
  }
];

// POST Route: /api/schemes/match
app.post('/api/schemes/match', async (req, res) => {
  try {
    const { age, annualIncome, gender, caste, state } = req.body;

    // Validate required fields
    if (!age || !annualIncome || !gender || !caste || !state) {
      return res.status(400).json({ 
        error: 'Missing required fields: age, annualIncome, gender, caste, state' 
      });
    }

    // Fetch schemes from in-memory data
    const schemes = schemesData;

    // Matching Algorithm
    const matchedSchemes = schemes.filter(scheme => {
      // Age check: user age should be between minAge and maxAge
      if (scheme.minAge && age < scheme.minAge) {
        return false;
      }
      if (scheme.maxAge && age > scheme.maxAge) {
        return false;
      }

      // Income check: user income should be <= maxIncome
      if (scheme.maxIncome && annualIncome > scheme.maxIncome) {
        return false;
      }

      // Gender eligibility check
      if (scheme.genderEligibility && scheme.genderEligibility.length > 0) {
        if (!scheme.genderEligibility.includes('all') && 
            !scheme.genderEligibility.includes(gender.toLowerCase())) {
          return false;
        }
      }

      // Caste eligibility check
      if (scheme.casteEligibility && scheme.casteEligibility.length > 0) {
        if (!scheme.casteEligibility.includes('all') && 
            !scheme.casteEligibility.includes(caste.toLowerCase())) {
          return false;
        }
      }

      // State eligibility check
      if (scheme.stateEligibility && scheme.stateEligibility.length > 0) {
        if (!scheme.stateEligibility.includes('all') && 
            !scheme.stateEligibility.includes(state.toLowerCase())) {
          return false;
        }
      }

      return true;
    });

    res.json({
      success: true,
      count: matchedSchemes.length,
      schemes: matchedSchemes
    });

  } catch (error) {
    console.error('Error matching schemes:', error);
    res.status(500).json({ 
      error: 'Internal server error while matching schemes' 
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Home route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
