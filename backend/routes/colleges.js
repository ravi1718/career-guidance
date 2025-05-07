const express = require('express');
const router = express.Router();
const College = require('../models/College');
const { body, validationResult } = require('express-validator');

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const colleges = await College.find().select('-reviews');
    res.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get colleges by country
router.get('/:country', async (req, res) => {
  try {
    const { country } = req.params;
    let query = {};
    
    // Special handling for 'abroad' parameter
    if (country.toLowerCase() === 'abroad') {
      // Exclude Indian colleges (those with India in location)
      query = {
        location: { $not: /india/i }
      };
    } else {
      // Case-insensitive search for country in location field
      query = {
        location: new RegExp(country, 'i')
      };
    }
    
    const colleges = await College.find(query).select('-reviews');
    res.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges by country:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get colleges by country and state
router.get('/:country/:state', async (req, res) => {
  try {
    const { country, state } = req.params;
    // Case-insensitive search for both state and country in location field
    const colleges = await College.find({
      location: {
        $regex: new RegExp(`${state}.*${country}|${state},.*${country}`, 'i')
      }
    }).select('-reviews');

    res.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges by state:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get college by ID
router.get('/detail/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.json(college);
  } catch (error) {
    console.error('Error fetching college details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a review to a college
router.post('/:id/reviews', [
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    const { rating, comment } = req.body;
    const studentId = req.user.studentId; // This will come from auth middleware

    // Check if student has already reviewed
    const existingReview = college.reviews.find(
      review => review.student.toString() === studentId
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this college' });
    }

    college.reviews.push({
      student: studentId,
      rating,
      comment
    });

    // Update average rating
    const totalRatings = college.reviews.reduce((sum, review) => sum + review.rating, 0);
    college.ratings = totalRatings / college.reviews.length;

    await college.save();
    res.status(201).json(college);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save/unsave a college for a student
router.post('/:id/save', async (req, res) => {
  try {
    const studentId = req.user.studentId; // This will come from auth middleware
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const collegeId = req.params.id;
    const collegeIndex = student.savedColleges.indexOf(collegeId);

    if (collegeIndex === -1) {
      // Save college
      student.savedColleges.push(collegeId);
    } else {
      // Unsave college
      student.savedColleges.splice(collegeIndex, 1);
    }

    await student.save();
    res.json({ savedColleges: student.savedColleges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 