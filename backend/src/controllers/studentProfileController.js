const { StudentProfile, User } = require('../models');

// @desc    Get student profile
// @route   GET /api/student/profile
// @access  Private (Student only)
const getStudentProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.userId })
      .populate('user', 'username email isVerified');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update student profile
// @route   PUT /api/student/profile
// @access  Private (Student only)
const updateStudentProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      bio,
      college,
      degree,
      graduationYear,
      skills,
      contactNumber,
      socialLinks
    } = req.body;

    // Build profile object
    const profileFields = {};
    if (firstName) profileFields.firstName = firstName;
    if (lastName) profileFields.lastName = lastName;
    if (bio) profileFields.bio = bio;
    if (college) profileFields.college = college;
    if (degree) profileFields.degree = degree;
    if (graduationYear) profileFields.graduationYear = graduationYear;
    if (skills) profileFields.skills = skills;
    if (contactNumber) profileFields.contactNumber = contactNumber;
    
    // Build social object
    if (socialLinks) {
      profileFields.socialLinks = {};
      if (socialLinks.linkedin) profileFields.socialLinks.linkedin = socialLinks.linkedin;
      if (socialLinks.github) profileFields.socialLinks.github = socialLinks.github;
      if (socialLinks.portfolio) profileFields.socialLinks.portfolio = socialLinks.portfolio;
    }

    let profile = await StudentProfile.findOne({ user: req.userId });

    if (profile) {
      // Update existing profile
      profile = await StudentProfile.findOneAndUpdate(
        { user: req.userId },
        { $set: profileFields },
        { new: true }
      ).populate('user', 'username email isVerified');
    } else {
      // Create new profile
      profile = new StudentProfile({
        user: req.userId,
        ...profileFields
      });
      await profile.save();
      profile = await StudentProfile.findOne({ user: req.userId })
        .populate('user', 'username email isVerified');
    }

    res.json(profile);
  } catch (error) {
    console.error('Update student profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update student profile picture
// @route   PUT /api/student/profile/picture
// @access  Private (Student only)
const updateProfilePicture = async (req, res) => {
  try {
    // Note: In a real implementation, this would use Multer to handle file upload
    // and store the image URL (e.g., on S3 or another storage service)
    const { profilePicture } = req.body;

    if (!profilePicture) {
      return res.status(400).json({ message: 'Profile picture URL is required' });
    }

    const profile = await StudentProfile.findOneAndUpdate(
      { user: req.userId },
      { $set: { profilePicture } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ profilePicture: profile.profilePicture });
  } catch (error) {
    console.error('Update profile picture error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Upload student resume
// @route   PUT /api/student/profile/resume
// @access  Private (Student only)
const uploadResume = async (req, res) => {
  try {
    // Note: In a real implementation, this would use Multer to handle file upload
    // and store the document URL (e.g., on S3 or another storage service)
    const { resumeUrl } = req.body;

    if (!resumeUrl) {
      return res.status(400).json({ message: 'Resume URL is required' });
    }

    const profile = await StudentProfile.findOneAndUpdate(
      { user: req.userId },
      { $set: { resumeUrl } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ resumeUrl: profile.resumeUrl });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student badges
// @route   GET /api/student/profile/badges
// @access  Private (Student only)
const getStudentBadges = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.userId });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile.badges);
  } catch (error) {
    console.error('Get student badges error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStudentProfile,
  updateStudentProfile,
  updateProfilePicture,
  uploadResume,
  getStudentBadges
}; 