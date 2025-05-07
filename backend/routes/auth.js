const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const College = require('../models/College');

// Register a new student
router.post('/register/student', [
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('phone').notEmpty().trim(),
  body('password').isLength({ min: 6 }),
  body('educationLevel').isIn(['high_school', 'undergraduate', 'graduate', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone, password, location, educationLevel } = req.body;

    // Check if student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    // Create new student
    student = new Student({
      firstName,
      lastName,
      email,
      phone,
      password,
      location,
      educationLevel
    });

    await student.save();

    // Create JWT token
    const token = jwt.sign(
      { studentId: student._id, userType: 'student' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        location: student.location,
        educationLevel: student.educationLevel,
        userType: 'student'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register a new college
router.post('/register/college', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('location').notEmpty().trim(),
  body('description').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location, description } = req.body;

    // Check if college already exists
    let college = await College.findOne({ email });
    if (college) {
      return res.status(400).json({ message: 'College already exists' });
    }

    // Create new college
    college = new College({
      name,
      email,
      password,
      location,
      description
    });

    await college.save();

    // Create JWT token
    const token = jwt.sign(
      { collegeId: college._id, userType: 'college' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: college._id,
        name: college.name,
        email: college.email,
        location: college.location,
        userType: 'college'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user (student or college)
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists(),
  body('userType').isIn(['student', 'college'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, userType } = req.body;

    let user;
    if (userType === 'student') {
      user = await Student.findOne({ email });
    } else {
      user = await College.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        [userType === 'student' ? 'studentId' : 'collegeId']: user._id,
        userType 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Prepare user data based on type
    const userData = userType === 'student' ? {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      location: user.location,
      educationLevel: user.educationLevel,
      userType: 'student'
    } : {
      id: user._id,
      name: user.name,
      email: user.email,
      location: user.location,
      userType: 'college'
    };

    res.json({
      token,
      user: userData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 