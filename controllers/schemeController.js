const Scheme = require('../models/Scheme');

/**
 * Scheme Controller
 * 
 * Centralized database controller for Government Schemes.
 * Handles filtering, searching, and database seeding.
 */

/**
 * @desc    Get filtered schemes based on user criteria
 * @route   GET /api/schemes
 * @access  Public
 */
const getFilteredSchemes = async (req, res) => {
  try {
    const { age, income, state, profession, search } = req.query;
    
    // Input validation
    if (age !== undefined) {
      const parsedAge = parseFloat(age);
      if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 150) {
        return res.status(400).json({
          success: false,
          error: 'Invalid age value. Must be between 0 and 150.'
        });
      }
    }
    
    if (income !== undefined) {
      const parsedIncome = parseFloat(income);
      if (isNaN(parsedIncome) || parsedIncome < 0 || parsedIncome > 100000000) {
        return res.status(400).json({
          success: false,
          error: 'Invalid income value. Must be between 0 and 100,000,000.'
        });
      }
    }
    
    if (state !== undefined) {
      if (typeof state !== 'string' || state.length > 100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid state value. Must be a string under 100 characters.'
        });
      }
    }
    
    if (profession !== undefined) {
      if (typeof profession !== 'string' || profession.length > 100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid profession value. Must be a string under 100 characters.'
        });
      }
    }
    
    if (search !== undefined) {
      if (typeof search !== 'string' || search.length > 200) {
        return res.status(400).json({
          success: false,
          error: 'Invalid search value. Must be a string under 200 characters.'
        });
      }
      // Sanitize search to prevent ReDoS
      const dangerousPatterns = [
        /\*\*/,
        /\+/,
        /\{/,
        /\}/,
        /\[/,
        /\]/
      ];
      for (const pattern of dangerousPatterns) {
        if (pattern.test(search)) {
          return res.status(400).json({
            success: false,
            error: 'Search contains invalid characters.'
          });
        }
      }
    }
    
    // Build dynamic MongoDB query
    const query = {};
    
    // Income filter: maxIncome >= user income
    if (income) {
      query.maxIncome = { $gte: parseFloat(income) };
    }
    
    // Age filter: minAge <= user age AND maxAge >= user age
    if (age) {
      const userAge = parseFloat(age);
      query.minAge = { $lte: userAge };
      query.$or = [
        { maxAge: { $gte: userAge } },
        { maxAge: null },
        { maxAge: { $exists: false } }
      ];
    }
    
    // State filter: allowedStates matches user state OR "All"
    if (state && state !== '') {
      query.$or = query.$or || [];
      query.$or.push(
        { allowedStates: 'All' },
        { allowedStates: { $in: [state, state.toLowerCase()] } },
        { allowedStates: { $in: ['All', state, state.toLowerCase()] } }
      );
    }
    
    // Profession filter: allowedProfessions matches user profession OR "All"
    if (profession && profession !== '') {
      query.$or = query.$or || [];
      query.$or.push(
        { allowedProfessions: 'All' },
        { allowedProfessions: { $in: [profession, profession.toLowerCase()] } },
        { allowedProfessions: { $in: ['All', profession, profession.toLowerCase()] } }
      );
    }
    
    // Search filter: case-insensitive regex matching title or category
    if (search && search !== '') {
      const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = query.$or || [];
      query.$or.push(
        { title: searchRegex },
        { category: searchRegex }
      );
    }
    
    // Execute query
    const schemes = await Scheme.find(query);
    
    res.status(200).json({
      success: true,
      count: schemes.length,
      data: schemes
    });
  } catch (error) {
    console.error('Error filtering schemes:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error while filtering schemes'
    });
  }
};

/**
 * @desc    Seed initial schemes into database
 * @access  Private (called on startup)
 */
const seedInitialSchemes = async () => {
  try {
    const count = await Scheme.countDocuments();
    
    if (count === 0) {
      console.log('🌱 Seeding database with initial schemes...');
      
      const initialSchemes = [
        {
          title: 'PM Kisan Samman Nidhi',
          category: 'Agriculture',
          financialBenefit: '₹6,000 per year in three equal installments to farmer families',
          minAge: 18,
          maxAge: null,
          maxIncome: 300000,
          allowedStates: ['All'],
          allowedProfessions: ['Farmer'],
          documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Account'],
          matchPercentageDescription: 'High match for farmers with land ownership'
        },
        {
          title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
          category: 'Healthcare',
          financialBenefit: 'Health insurance coverage of ₹5 lakh per family per year',
          minAge: 0,
          maxAge: null,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Ration Card', 'Bank Account'],
          matchPercentageDescription: 'Universal health coverage for all families'
        },
        {
          title: 'Pradhan Mantri Awas Yojana (PMAY)',
          category: 'Housing',
          financialBenefit: 'Interest subsidy up to ₹2.67 lakh for housing construction',
          minAge: 18,
          maxAge: 70,
          maxIncome: 180000,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Bank Account', 'Land Records'],
          matchPercentageDescription: 'Housing support for low-income families'
        },
        {
          title: 'Sukanya Samriddhi Yojana',
          category: 'Finance',
          financialBenefit: 'High interest rate savings account for girl child education',
          minAge: 0,
          maxAge: 10,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Birth Certificate', 'Aadhaar Card', 'Bank Account'],
          matchPercentageDescription: 'Savings scheme for girl children under 10'
        },
        {
          title: 'Post-Matric Scholarship for SC Students',
          category: 'Education',
          financialBenefit: 'Full tuition fee reimbursement and monthly allowance',
          minAge: 15,
          maxAge: 30,
          maxIncome: 250000,
          allowedStates: ['All'],
          allowedProfessions: ['Student'],
          documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Caste Certificate', 'Mark Sheets'],
          matchPercentageDescription: 'Educational support for SC students'
        },
        {
          title: 'PM Mudra Yojana',
          category: 'Finance',
          financialBenefit: 'Loans up to ₹10 lakh for micro enterprises',
          minAge: 18,
          maxAge: 65,
          maxIncome: 1000000,
          allowedStates: ['All'],
          allowedProfessions: ['Business', 'Self-Employed'],
          documentsRequired: ['Aadhaar Card', 'PAN Card', 'Bank Account', 'Business Registration'],
          matchPercentageDescription: 'Business loans for entrepreneurs'
        },
        {
          title: 'PM SVANidhi',
          category: 'Finance',
          financialBenefit: 'Working capital loan up to ₹10,000 for street vendors',
          minAge: 18,
          maxAge: null,
          maxIncome: 150000,
          allowedStates: ['All'],
          allowedProfessions: ['Street Vendor'],
          documentsRequired: ['Aadhaar Card', 'Vendor Certificate', 'Bank Account'],
          matchPercentageDescription: 'Micro-loans for street vendors'
        },
        {
          title: 'Beti Bachao Beti Padhao',
          category: 'Women',
          financialBenefit: '₹1.5 lakh for girl child education and welfare',
          minAge: 0,
          maxAge: 18,
          maxIncome: 300000,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Birth Certificate', 'Bank Account'],
          matchPercentageDescription: 'Education and welfare support for girl children'
        },
        {
          title: 'National Pension System (NPS)',
          category: 'Finance',
          financialBenefit: 'Pension scheme with government contribution',
          minAge: 18,
          maxAge: 65,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'PAN Card', 'Bank Account'],
          matchPercentageDescription: 'Retirement savings for all citizens'
        },
        {
          title: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
          category: 'Education',
          financialBenefit: 'Skill training with monetary reward and certification',
          minAge: 15,
          maxAge: 35,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Bank Account'],
          matchPercentageDescription: 'Skill development training for youth'
        },
        {
          title: 'Atal Pension Yojana',
          category: 'Finance',
          financialBenefit: 'Fixed pension of ₹1,000-5,000 after retirement',
          minAge: 18,
          maxAge: 40,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Bank Account'],
          matchPercentageDescription: 'Pension scheme for unorganized sector workers'
        },
        {
          title: 'Pradhan Mantri Fasal Bima Yojana',
          category: 'Agriculture',
          financialBenefit: 'Crop insurance with premium subsidy',
          minAge: 18,
          maxAge: null,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['Farmer'],
          documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Account'],
          matchPercentageDescription: 'Crop insurance for farmers'
        },
        {
          title: 'Stand Up India',
          category: 'Finance',
          financialBenefit: 'Loans up to ₹1 crore for SC/ST and women entrepreneurs',
          minAge: 18,
          maxAge: null,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['Business', 'Self-Employed'],
          documentsRequired: ['Aadhaar Card', 'PAN Card', 'Caste Certificate', 'Business Plan'],
          matchPercentageDescription: 'Business loans for SC/ST and women'
        },
        {
          title: 'National Health Mission',
          category: 'Healthcare',
          financialBenefit: 'Free healthcare services and medicines',
          minAge: 0,
          maxAge: null,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Ration Card'],
          matchPercentageDescription: 'Free healthcare for all citizens'
        },
        {
          title: 'Pradhan Mantri Matru Vandana Yojana',
          category: 'Women',
          financialBenefit: '₹5,000 for pregnant and lactating mothers',
          minAge: 18,
          maxAge: 50,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Bank Account', 'Pregnancy Certificate'],
          matchPercentageDescription: 'Maternity benefit for mothers'
        },
        {
          title: 'Ujjwala Yojana',
          category: 'Housing',
          financialBenefit: 'Free LPG connection to BPL households',
          minAge: 18,
          maxAge: null,
          maxIncome: 100000,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'BPL Card', 'Bank Account'],
          matchPercentageDescription: 'Clean cooking fuel for poor families'
        },
        {
          title: 'Swachh Bharat Mission',
          category: 'Housing',
          financialBenefit: 'Financial assistance for building toilets',
          minAge: 18,
          maxAge: null,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Bank Account'],
          matchPercentageDescription: 'Sanitation support for rural households'
        },
        {
          title: 'National Scholarship Portal',
          category: 'Education',
          financialBenefit: 'Various scholarships for meritorious students',
          minAge: 10,
          maxAge: 25,
          maxIncome: 300000,
          allowedStates: ['All'],
          allowedProfessions: ['Student'],
          documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Mark Sheets', 'Bank Account'],
          matchPercentageDescription: 'Scholarships for meritorious students'
        },
        {
          title: 'Pradhan Mantri Shram Yogi Maan-Dhan',
          category: 'Finance',
          financialBenefit: 'Pension scheme for unorganized sector workers',
          minAge: 18,
          maxAge: 40,
          maxIncome: 15000,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Bank Account'],
          matchPercentageDescription: 'Pension for unorganized workers'
        },
        {
          title: 'Kisan Credit Card (KCC)',
          category: 'Agriculture',
          financialBenefit: 'Credit facility for farmers with interest subsidy',
          minAge: 18,
          maxAge: null,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['Farmer'],
          documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Account'],
          matchPercentageDescription: 'Credit facility for agricultural activities'
        },
        {
          title: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
          category: 'Finance',
          financialBenefit: 'Life insurance cover of ₹2 lakh at ₹330 per year',
          minAge: 18,
          maxAge: 50,
          maxIncome: null,
          allowedStates: ['All'],
          allowedProfessions: ['All'],
          documentsRequired: ['Aadhaar Card', 'Bank Account'],
          matchPercentageDescription: 'Affordable life insurance for all'
        }
      ];
      
      await Scheme.insertMany(initialSchemes);
      console.log(`✅ Successfully seeded ${initialSchemes.length} government schemes`);
    } else {
      console.log(`ℹ️  Database already contains ${count} schemes. Skipping seeding.`);
    }
  } catch (error) {
    console.error('❌ Error seeding schemes:', error);
  }
};

module.exports = {
  getFilteredSchemes,
  seedInitialSchemes
};
