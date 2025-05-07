const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  courses: [{
    name: String,
    duration: String,
    eligibility: String,
    fees: Number
  }],
  facilities: [{
    type: String
  }],
  placement: {
    averagePackage: Number,
    topCompanies: [String],
    placementPercentage: Number
  },
  admissionProcess: {
    type: String,
    required: true
  },
  contactInfo: {
    email: String,
    phone: String,
    website: String,
    address: String
  },
  images: [{
    type: String
  }],
  ratings: {
    type: Number,
    default: 0
  },
  reviews: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
collegeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
collegeSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('College', collegeSchema); 