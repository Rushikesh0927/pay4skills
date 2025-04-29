const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  college: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  graduationYear: {
    type: Number,
    required: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  resumeUrl: {
    type: String
  },
  profilePicture: {
    type: String
  },
  contactNumber: {
    type: String,
    trim: true
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  badges: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    icon: {
      type: String
    },
    dateAwarded: {
      type: Date,
      default: Date.now
    }
  }],
  socialLinks: {
    linkedin: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    },
    portfolio: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

module.exports = StudentProfile; 