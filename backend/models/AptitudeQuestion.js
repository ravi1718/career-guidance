const mongoose = require('mongoose');

const aptitudeQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  category: {
    type: String,
    required: true,
    enum: ['verbal', 'quantitative', 'general']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema); 