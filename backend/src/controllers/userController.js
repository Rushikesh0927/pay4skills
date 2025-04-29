const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, StudentProfile, EmployerProfile } = require('../models');
const config = require('../config/config');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    config.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      return res.status(400).json({ 
        message: userExists.email === email 
          ? 'Email already registered' 
          : 'Username already taken' 
      });
    }

    // Validate role
    if (!['student', 'employer'].includes(role)) {
      return res.status(400).json({ 
        message: 'Invalid role. Must be either "student" or "employer"' 
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role
    });

    // Create profile based on role
    if (role === 'student') {
      await StudentProfile.create({
        user: user._id,
        firstName: '',
        lastName: '',
        college: '',
        degree: '',
        graduationYear: new Date().getFullYear() + 4,
        skills: []
      });
    } else if (role === 'employer') {
      await EmployerProfile.create({
        user: user._id,
        companyName: '',
        industry: '',
        description: '',
        contactEmail: email,
        address: {
          city: '',
          state: '',
          country: ''
        }
      });
    }

    if (user) {
      // Generate token
      const token = generateToken(user._id);

      res.status(201).json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account has been deactivated' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Find user
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Deactivate user account
// @route   PUT /api/users/deactivate
// @access  Private
const deactivateAccount = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: 'Account deactivated successfully' });
  } catch (error) {
    console.error('Deactivate account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updatePassword,
  deactivateAccount
}; 