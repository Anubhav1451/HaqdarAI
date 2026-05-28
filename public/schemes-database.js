// Comprehensive Indian Government Schemes Database
const GOVERNMENT_SCHEMES_DATA = [
    {
        id: '1',
        title: 'PM Kisan Samman Nidhi',
        category: 'Agriculture',
        description: 'Income support of ₹6,000 per year to farmers in three installments',
        financialBenefit: '₹6,000 per year in three installments',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 100,
            maxIncome: 300000,
            states: ['All'],
            professions: ['Farmer']
        },
        documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Mobile Number'],
        whatsappText: 'PM Kisan Samman Nidhi - ₹6,000 annual income support for farmers. Apply now!'
    },
    {
        id: '2',
        title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
        category: 'Healthcare',
        description: 'Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization',
        financialBenefit: '₹5 lakh health insurance coverage per family per year',
        eligibilityCriteria: {
            minAge: 0,
            maxAge: 100,
            maxIncome: 200000,
            states: ['All'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Ration Card', 'Income Certificate', 'Bank Account'],
        whatsappText: 'Ayushman Bharat - ₹5 lakh health insurance coverage per family. Check eligibility now!'
    },
    {
        id: '3',
        title: 'Pradhan Mantri Awas Yojana (PMAY)',
        category: 'Housing',
        description: 'Housing subsidy up to ₹2.67 lakh for eligible families to build or buy a house',
        financialBenefit: 'Housing subsidy up to ₹2.67 lakh',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 70,
            maxIncome: 180000,
            states: ['All'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Bank Account', 'Land Documents'],
        whatsappText: 'PMAY - Housing subsidy up to ₹2.67 lakh for eligible families. Apply today!'
    },
    {
        id: '4',
        title: 'Sukanya Samriddhi Yojana',
        category: 'Banking',
        description: 'Savings scheme for girl child with 8.2% interest rate and tax benefits',
        financialBenefit: '8.2% interest rate with tax benefits under Section 80C',
        eligibilityCriteria: {
            minAge: 0,
            maxAge: 10,
            maxIncome: null,
            states: ['All'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Birth Certificate', 'Bank Account', 'PAN Card'],
        whatsappText: 'Sukanya Samriddhi - 8.2% interest savings for girl child with tax benefits. Open account now!'
    },
    {
        id: '5',
        title: 'Post-Matric Scholarship for SC Students',
        category: 'Education',
        description: 'Financial assistance for SC students pursuing post-matric education',
        financialBenefit: 'Full tuition fee reimbursement and monthly allowance',
        eligibilityCriteria: {
            minAge: 15,
            maxAge: 30,
            maxIncome: 250000,
            states: ['All'],
            professions: ['Student']
        },
        documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Mark Sheets', 'Bank Account', 'College ID'],
        whatsappText: 'Post-Matric Scholarship - Financial support for minority students. Apply now!'
    },
    {
        id: '6',
        title: 'PM SVANidhi',
        category: 'Business',
        description: 'Micro-credit facility of ₹10,000 to street vendors to restart their businesses',
        financialBenefit: '₹10,000 working capital loan with interest subsidy',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 65,
            maxIncome: 150000,
            states: ['All'],
            professions: ['Street Vendor']
        },
        documentsRequired: ['Aadhaar Card', 'Vendor ID', 'Bank Account', 'Mobile Number'],
        whatsappText: 'PM SVANidhi - ₹10,000 loan for street vendors with interest subsidy. Apply today!'
    },
    {
        id: '7',
        title: 'Pradhan Mantri Mudra Yojana',
        category: 'Business',
        description: 'Loans up to ₹10 lakh for micro enterprises and small businesses',
        financialBenefit: 'Loans up to ₹10 lakh for micro enterprises',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 65,
            maxIncome: 1000000,
            states: ['All'],
            professions: ['Business', 'Entrepreneur']
        },
        documentsRequired: ['Aadhaar Card', 'PAN Card', 'Business Plan', 'Bank Account'],
        whatsappText: 'PM Mudra Yojana - Loans up to ₹10 lakh for small businesses. Apply now!'
    },
    {
        id: '8',
        title: 'Atal Pension Yojana',
        category: 'Pension',
        description: 'Pension scheme for unorganized sector workers with guaranteed minimum pension',
        financialBenefit: 'Minimum pension of ₹1,000 to ₹5,000 per month after 60 years',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 40,
            maxIncome: 200000,
            states: ['All'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Bank Account', 'Mobile Number'],
        whatsappText: 'Atal Pension Yojana - Secure your future with guaranteed monthly pension. Enroll now!'
    },
    {
        id: '9',
        title: 'PM Vishwakarma Yojana',
        category: 'Business',
        description: 'Support for traditional artisans and craftsmen with loans up to ₹3 lakh',
        financialBenefit: 'Loans up to ₹3 lakh with tool kit incentive and training support',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 65,
            maxIncome: 300000,
            states: ['All'],
            professions: ['Artisan', 'Craftsman', 'Carpenter', 'Blacksmith', 'Potter']
        },
        documentsRequired: ['Aadhaar Card', 'Artisan ID', 'Bank Account', 'Work Sample Photos'],
        whatsappText: 'PM Vishwakarma - Support for artisans with loans up to ₹3 lakh. Apply today!'
    },
    {
        id: '10',
        title: 'National Means-cum-Merit Scholarship',
        category: 'Education',
        description: 'Scholarship for meritorious students from economically weaker sections',
        financialBenefit: '₹12,000 per annum (₹1,000 per month)',
        eligibilityCriteria: {
            minAge: 12,
            maxAge: 18,
            maxIncome: 150000,
            states: ['All'],
            professions: ['Student']
        },
        documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Mark Sheets', 'Bank Account'],
        whatsappText: 'NMMS Scholarship - ₹12,000 per year for meritorious students. Apply now!'
    },
    {
        id: '11',
        title: 'Ladli Behna Yojana',
        category: 'Women Welfare',
        description: 'Monthly financial assistance of ₹1,250 to women in Madhya Pradesh',
        financialBenefit: '₹1,250 per month to eligible women',
        eligibilityCriteria: {
            minAge: 21,
            maxAge: 60,
            maxIncome: 250000,
            states: ['Madhya Pradesh'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Bank Account', 'MP Residence Proof', 'Income Certificate'],
        whatsappText: 'Ladli Behna Yojana - ₹1,250 monthly for women in MP. Apply today!'
    },
    {
        id: '12',
        title: 'Delhi Ladli Scheme',
        category: 'Women Welfare',
        description: 'Financial assistance for girl children born in Delhi families',
        financialBenefit: 'Up to ₹1,00,000 for girl child education and marriage',
        eligibilityCriteria: {
            minAge: 0,
            maxAge: 18,
            maxIncome: 300000,
            states: ['Delhi'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Birth Certificate', 'Delhi Residence Proof', 'Bank Account'],
        whatsappText: 'Delhi Ladli Scheme - Financial assistance for girl children in Delhi. Apply now!'
    },
    {
        id: '13',
        title: 'Stand-Up India',
        category: 'Business',
        description: 'Loans for SC/ST and women entrepreneurs for greenfield enterprises',
        financialBenefit: 'Loans from ₹10 lakh to ₹1 crore for entrepreneurship',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 65,
            maxIncome: 500000,
            states: ['All'],
            professions: ['Business', 'Entrepreneur']
        },
        documentsRequired: ['Aadhaar Card', 'Caste Certificate', 'Business Plan', 'Bank Account'],
        whatsappText: 'Stand-Up India - Loans up to ₹1 crore for SC/ST and women entrepreneurs. Apply now!'
    },
    {
        id: '14',
        title: 'PM Ujjwala Yojana',
        category: 'Energy',
        description: 'Free LPG connections to BPL households to reduce health hazards',
        financialBenefit: 'Free LPG connection with first refill and stove free of cost',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 70,
            maxIncome: 100000,
            states: ['All'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Ration Card', 'Bank Account', 'Address Proof'],
        whatsappText: 'PM Ujjwala Yojana - Free LPG connection for BPL families. Apply today!'
    },
    {
        id: '15',
        title: 'Babu Jagjivan Ram Chhatrawas Yojana',
        category: 'Education',
        description: 'Hostel facilities for SC/ST students pursuing higher education',
        financialBenefit: 'Free hostel accommodation with mess facilities',
        eligibilityCriteria: {
            minAge: 17,
            maxAge: 25,
            maxIncome: 250000,
            states: ['All'],
            professions: ['Student']
        },
        documentsRequired: ['Aadhaar Card', 'Caste Certificate', 'College Admission Proof', 'Income Certificate'],
        whatsappText: 'Babu Jagjivan Ram Chhatrawas Yojana - Free hostel for SC/ST students. Apply now!'
    },
    {
        id: '16',
        title: 'National Social Assistance Programme (NSAP)',
        category: 'Social Welfare',
        description: 'Pension support for elderly, widows, and disabled persons',
        financialBenefit: '₹300-₹500 per month pension support',
        eligibilityCriteria: {
            minAge: 60,
            maxAge: 100,
            maxIncome: 50000,
            states: ['All'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Age Proof', 'Bank Account', 'Income Certificate'],
        whatsappText: 'NSAP - Monthly pension support for elderly, widows, and disabled. Apply now!'
    },
    {
        id: '17',
        title: 'Pradhan Mantri Shram Yogi Maan-Dhan',
        category: 'Pension',
        description: 'Pension scheme for unorganized sector workers',
        financialBenefit: 'Minimum assured pension of ₹3,000 per month after 60 years',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 40,
            maxIncome: 150000,
            states: ['All'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Bank Account', 'Mobile Number'],
        whatsappText: 'PM Shram Yogi Maan-Dhan - ₹3,000 monthly pension for unorganized workers. Enroll now!'
    },
    {
        id: '18',
        title: 'National Scholarship Portal (NSP) Scholarships',
        category: 'Education',
        description: 'Central sector scholarships for meritorious students',
        financialBenefit: '₹10,000 to ₹20,000 per annum based on course',
        eligibilityCriteria: {
            minAge: 15,
            maxAge: 25,
            maxIncome: 200000,
            states: ['All'],
            professions: ['Student']
        },
        documentsRequired: ['Aadhaar Card', 'Income Certificate', 'Mark Sheets', 'Bank Account'],
        whatsappText: 'NSP Scholarships - Financial support for meritorious students. Apply now!'
    },
    {
        id: '19',
        title: 'Kisan Credit Card (KCC) Scheme',
        category: 'Agriculture',
        description: 'Credit facility for farmers to meet agricultural needs',
        financialBenefit: 'Credit limit up to ₹3 lakh with interest subsidy',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 65,
            maxIncome: 500000,
            states: ['All'],
            professions: ['Farmer']
        },
        documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Cultivation Details'],
        whatsappText: 'Kisan Credit Card - Credit up to ₹3 lakh for farmers. Apply today!'
    },
    {
        id: '20',
        title: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
        category: 'Skill Development',
        description: 'Skill development training to youth for employment',
        financialBenefit: 'Free skill training with placement assistance',
        eligibilityCriteria: {
            minAge: 15,
            maxAge: 35,
            maxIncome: 300000,
            states: ['All'],
            professions: ['All']
        },
        documentsRequired: ['Aadhaar Card', 'Bank Account', 'Educational Qualification Proof'],
        whatsappText: 'PMKVY - Free skill training with job placement. Register now!'
    },
    {
        id: '21',
        title: 'Digital India Land Records Modernization Programme',
        category: 'Agriculture',
        description: 'Computerization of land records to provide transparency',
        financialBenefit: 'Transparent land records with online access',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 100,
            maxIncome: null,
            states: ['All'],
            professions: ['Farmer', 'Landowner']
        },
        documentsRequired: ['Aadhaar Card', 'Land Documents', 'Property Papers'],
        whatsappText: 'Digital Land Records - Modernize your land records. Check online now!'
    },
    {
        id: '22',
        title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        category: 'Agriculture',
        description: 'Crop insurance scheme for farmers against natural calamities',
        financialBenefit: 'Crop insurance with low premium (2% for Kharif, 1.5% for Rabi)',
        eligibilityCriteria: {
            minAge: 18,
            maxAge: 100,
            maxIncome: null,
            states: ['All'],
            professions: ['Farmer']
        },
        documentsRequired: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Crop Details'],
        whatsappText: 'PM Fasal Bima Yojana - Protect your crops with insurance. Enroll now!'
    }
];

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOVERNMENT_SCHEMES_DATA;
}