const mongoose = require('mongoose');

/**
 * Government Scheme Schema
 * 
 * Production-ready Mongoose schema for Government Welfare Schemes.
 * Supports complex eligibility criteria for filtering and matching.
 */
const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Scheme title is required'],
    trim: true,
    index: true
  },
  category: {
    type: String,
    required: [true, 'Scheme category is required'],
    trim: true,
    enum: ['Agriculture', 'Education', 'Healthcare', 'Finance', 'Housing', 'Women', 'Senior Citizen', 'General'],
    index: true
  },
  financialBenefit: {
    type: String,
    required: [true, 'Financial benefit description is required'],
    trim: true
  },
  minAge: {
    type: Number,
    default: 0,
    min: [0, 'Minimum age cannot be negative']
  },
  maxAge: {
    type: Number,
    default: null,
    min: [0, 'Maximum age cannot be negative']
  },
  maxIncome: {
    type: Number,
    default: null,
    min: [0, 'Maximum income cannot be negative']
  },
  allowedStates: {
    type: [String],
    default: ['All'],
    validate: {
      validator: function(states) {
        return states.length > 0;
      },
      message: 'At least one state must be specified'
    }
  },
  allowedProfessions: {
    type: [String],
    default: ['All'],
    validate: {
      validator: function(professions) {
        return professions.length > 0;
      },
      message: 'At least one profession must be specified'
    }
  },
  documentsRequired: {
    type: [String],
    default: [],
    validate: {
      validator: function(docs) {
        return Array.isArray(docs);
      },
      message: 'Documents required must be an array'
    }
  },
  matchPercentageDescription: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
schemeSchema.index({ allowedStates: 1 });
schemeSchema.index({ maxIncome: 1 });
schemeSchema.index({ minAge: 1, maxAge: 1 });

module.exports = mongoose.model('Scheme', schemeSchema);
