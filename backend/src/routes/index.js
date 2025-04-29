const express = require('express');
const userRoutes = require('./userRoutes');
const studentRoutes = require('./studentRoutes');

const router = express.Router();

// User routes
router.use('/users', userRoutes);

// Student routes
router.use('/student', studentRoutes);

// Handle 404 for API routes
router.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

module.exports = router; 