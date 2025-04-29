const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  updatePassword, 
  deactivateAccount 
} = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.put('/password', auth, updatePassword);
router.put('/deactivate', auth, deactivateAccount);

module.exports = router; 