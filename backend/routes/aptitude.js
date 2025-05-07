const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const AptitudeQuestion = require('../models/AptitudeQuestion');
const Student = require('../models/Student');

// Middleware to check if user is authenticated
const auth = require('../middleware/auth');

// Get aptitude test questions
router.get('/questions', auth, async (req, res) => {
  try {
    // Different behavior for students and colleges
    if (req.user.userType === 'college') {
      // Colleges can see all their questions
      const questions = await AptitudeQuestion.find({ 
        createdBy: req.user.collegeId 
      }).sort({ createdAt: -1 });
      return res.json(questions);
    }

    // For students taking the test
    if (req.user.userType === 'student') {
      // Get questions from each category
      const verbalQuestions = await AptitudeQuestion.aggregate([
        { $match: { category: 'verbal', isActive: true } },
        { $sample: { size: 20 } }
      ]);

      const quantitativeQuestions = await AptitudeQuestion.aggregate([
        { $match: { category: 'quantitative', isActive: true } },
        { $sample: { size: 20 } }
      ]);

      const generalQuestions = await AptitudeQuestion.aggregate([
        { $match: { category: 'general', isActive: true } },
        { $sample: { size: 20 } }
      ]);

      // Combine and shuffle all questions
      const allQuestions = [...verbalQuestions, ...quantitativeQuestions, ...generalQuestions];
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

      return res.json(shuffledQuestions);
    }

    // If user type is neither student nor college
    return res.status(403).json({ message: 'Unauthorized access' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new aptitude question (college only)
router.post('/questions', [
  auth,
  body('question').notEmpty().trim(),
  body('options').isArray({ min: 4, max: 4 }),
  body('correctAnswer').isInt({ min: 0, max: 3 }),
  body('category').isIn(['verbal', 'quantitative', 'general']),
  body('difficulty').isIn(['easy', 'medium', 'hard'])
], async (req, res) => {
  try {
    // Only allow colleges to add questions
    if (req.user.userType !== 'college') {
      return res.status(403).json({ message: 'Only colleges can add aptitude questions' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, options, correctAnswer, category, difficulty } = req.body;

    const newQuestion = new AptitudeQuestion({
      question,
      options,
      correctAnswer,
      category,
      difficulty,
      createdBy: req.user.collegeId,
      isActive: true // Explicitly set isActive
    });

    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit aptitude test answers and get results
router.post('/submit', [
  auth,
  body('answers').isArray(),
  body('answers.*.questionId').isMongoId(),
  body('answers.*.selectedAnswer').isInt({ min: 0, max: 3 })
], async (req, res) => {
  try {
    // Only allow students to submit answers
    if (req.user.userType !== 'student') {
      return res.status(403).json({ message: 'Only students can submit aptitude test answers' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { answers } = req.body;
    const results = {
      verbal: 0,
      quantitative: 0,
      general: 0
    };

    let totalQuestions = 0;

    // Calculate scores for each category
    for (const answer of answers) {
      const question = await AptitudeQuestion.findById(answer.questionId);
      if (question) {
        totalQuestions++;
        if (answer.selectedAnswer === question.correctAnswer) {
          results[question.category]++;
        }
      }
    }

    // Convert to percentages
    Object.keys(results).forEach(category => {
      results[category] = (results[category] / (totalQuestions / 3)) * 100;
    });

    // Calculate overall score
    const overallScore = Object.values(results).reduce((a, b) => a + b, 0) / Object.keys(results).length;

    // Save results to student profile
    await Student.findByIdAndUpdate(
      req.user.studentId,
      { $set: { aptitudeTestResults: results } }
    );

    res.json({
      categoryScores: results,
      overallScore,
      recommendations: generateRecommendations(results)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to generate career recommendations based on aptitude scores
function generateRecommendations(scores) {
  const recommendations = [];

  if (scores.verbal > 70) {
    recommendations.push({
      field: 'Communication',
      careers: ['Content Writing', 'Public Relations', 'Marketing', 'Journalism']
    });
  }

  if (scores.quantitative > 70) {
    recommendations.push({
      field: 'Technical',
      careers: ['Engineering', 'Data Science', 'Finance', 'Research']
    });
  }

  if (scores.general > 70) {
    recommendations.push({
      field: 'Management',
      careers: ['Business Administration', 'Human Resources', 'Project Management', 'Consulting']
    });
  }

  return recommendations;
}

module.exports = router; 