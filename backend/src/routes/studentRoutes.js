const express = require('express');
const { 
  getStudentProfile,
  updateStudentProfile,
  updateProfilePicture,
  uploadResume,
  getStudentBadges
} = require('../controllers/studentProfileController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected with authentication and authorization
router.use(auth);
router.use(authorize('student'));

// Profile routes
router.get('/profile', getStudentProfile);
router.put('/profile', updateStudentProfile);
router.put('/profile/picture', updateProfilePicture);
router.put('/profile/resume', uploadResume);
router.get('/profile/badges', getStudentBadges);

module.exports = router; 