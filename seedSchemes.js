const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Scheme = require('./models/Scheme');

// Load environment variables
dotenv.config();

// MongoDB Connection using the centralized config
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/haqdar-ai')
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('Please ensure MongoDB is running on localhost:27017');
  process.exit(1);
});

// Sample schemes data - Updated to match new schema structure
const schemes = [
  {
    title: 'PM Kisan Samman Nidhi',
    description: 'Pradhan Mantri Kisan Samman Nidhi - Income support for farmers',
    category: 'Farmer',
    financialBenefit: '₹6,000 per year in three installments',
    minAge: 18,
    maxAge: 100,
    maxIncome: 300000,
    allowedStates: ['All'],
    allowedProfessions: ['Farmer'],
    documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Account'],
    landOwnershipRequired: true,
    isGenderSpecific: 'all',
    whatsappText: '🎉 Check out PM Kisan Samman Nidhi - ₹6,000/year income support for farmers!',
    icon: 'sprout',
    color: 'emerald'
  },
  {
    title: 'Mudra Yojana',
    description: 'Pradhan Mantri Mudra Yojana - Loans for small businesses',
    category: 'Business',
    financialBenefit: 'Loans up to ₹10 lakh for micro enterprises',
    minAge: 18,
    maxAge: 65,
    maxIncome: 1000000,
    allowedStates: ['All'],
    allowedProfessions: ['Business', 'Self-Employed'],
    documentsRequired: ['Aadhaar Card', 'PAN Card', 'Bank Account', 'Business Registration'],
    landOwnershipRequired: false,
    isGenderSpecific: 'all',
    whatsappText: '🎉 Check out Mudra Yojana - Loans up to ₹10 lakh for small businesses!',
    icon: 'briefcase',
    color: 'blue'
  },
  {
    title: 'Post-Matric Scholarship',
    description: 'Post-Matric Scholarship for SC Students - Financial assistance for education',
    category: 'Student',
    financialBenefit: 'Full tuition fee reimbursement and monthly allowance',
    minAge: 15,
    maxAge: 30,
    maxIncome: 250000,
    allowedStates: ['All'],
    allowedProfessions: ['Student'],
    documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Caste Certificate', 'Mark Sheets'],
    landOwnershipRequired: false,
    isGenderSpecific: 'all',
    whatsappText: '🎉 Check out Post-Matric Scholarship - Financial assistance for education!',
    icon: 'graduation-cap',
    color: 'purple'
  },
  {
    title: 'Beti Bachao Beti Padhao',
    description: 'Beti Bachao Beti Padhao - Scheme for girl child education and welfare',
    category: 'Women',
    financialBenefit: '₹1.5 lakh for girl child education and welfare',
    minAge: 0,
    maxAge: 18,
    maxIncome: 300000,
    allowedStates: ['All'],
    allowedProfessions: ['All'],
    documentsRequired: ['Aadhaar Card', 'Birth Certificate', 'Bank Account'],
    landOwnershipRequired: false,
    isGenderSpecific: 'female',
    whatsappText: '🎉 Check out Beti Bachao Beti Padhao - ₹1.5 lakh for girl child education!',
    icon: 'heart',
    color: 'pink'
  },
  {
    title: 'Pradhan Mantri Awas Yojana',
    description: 'Pradhan Mantri Awas Yojana - Housing for all urban poor',
    category: 'General',
    financialBenefit: 'Subsidy up to ₹2.67 lakh for housing construction',
    minAge: 18,
    maxAge: 70,
    maxIncome: 180000,
    allowedStates: ['All'],
    allowedProfessions: ['All'],
    documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Bank Account', 'Land Records'],
    landOwnershipRequired: true,
    isGenderSpecific: 'all',
    whatsappText: '🎉 Check out PM Awas Yojana - Housing subsidy up to ₹2.67 lakh!',
    icon: 'home',
    color: 'orange'
  }
];

// Insert schemes into database
async function seedSchemes() {
  try {
    // Clear existing schemes (optional)
    await Scheme.deleteMany({});
    console.log('🗑️  Cleared existing schemes');

    // Insert new schemes
    const insertedSchemes = await Scheme.insertMany(schemes);
    console.log('✅ Successfully inserted schemes:');
    insertedSchemes.forEach(scheme => {
      console.log(`   - ${scheme.title} (${scheme.category})`);
    });

    console.log(`\n🎉 Seeding completed successfully! Inserted ${insertedSchemes.length} schemes.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding schemes:', error);
    process.exit(1);
  }
}

// Run the seed function
seedSchemes();
