const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  minAge: {
    type: Number,
    default: 0
  },
  maxAge: {
    type: Number,
    default: null
  },
  maxIncome: {
    type: Number,
    default: null
  },
  genderEligibility: {
    type: [String],
    enum: ['male', 'female', 'other', 'all'],
    default: ['all']
  },
  casteEligibility: {
    type: [String],
    default: []
  },
  stateEligibility: {
    type: [String],
    default: []
  },
  benefits: {
    type: String,
    required: true,
    trim: true
  },
  occupation: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scheme', schemeSchema);
