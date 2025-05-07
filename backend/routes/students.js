const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { body, validationResult } = require('express-validator');

// Get student profile
router.get('/profile', async (req, res) => {
  try {
    const studentId = req.user.studentId; // This will come from auth middleware
    const student = await Student.findById(studentId)
      .select('-password')
      .populate('savedColleges');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update student profile
router.put('/profile', [
  body('name').optional().notEmpty().trim(),
  body('location').optional().notEmpty().trim(),
  body('careerInterests').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const studentId = req.user.studentId;
    const updates = req.body;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { $set: updates },
      { new: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save aptitude test results
router.post('/aptitude-results', [
  body('results').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const studentId = req.user.studentId;
    const { results } = req.body;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { $set: { aptitudeTestResults: results } },
      { new: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get saved colleges
router.get('/saved-colleges', async (req, res) => {
  try {
    const studentId = req.user.studentId;
    const student = await Student.findById(studentId)
      .populate('savedColleges');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student.savedColleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 