const mongoose = require('mongoose');
const Scheme = require('./models/Scheme');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/haqdar')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  console.error('Please ensure MongoDB is running on localhost:27017');
  process.exit(1);
});

// Sample schemes data
const schemes = [
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

// Insert schemes into database
async function seedSchemes() {
  try {
    // Clear existing schemes (optional)
    await Scheme.deleteMany({});
    console.log('Cleared existing schemes');

    // Insert new schemes
    const insertedSchemes = await Scheme.insertMany(schemes);
    console.log('Successfully inserted schemes:');
    insertedSchemes.forEach(scheme => {
      console.log(`- ${scheme.title}`);
    });

    console.log('\nSeeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding schemes:', error);
    process.exit(1);
  }
}

// Run the seed function
seedSchemes();
