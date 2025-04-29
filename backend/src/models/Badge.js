const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  criteria: {
    type: {
      type: String,
      enum: ['task_completion', 'rating', 'earnings', 'time_on_platform', 'custom'],
      required: true
    },
    threshold: {
      type: Number,
      required: true
    },
    additionalRequirements: {
      type: String
    }
  },
  tier: {
    type: String,
    enum: ['bronze', 'silver', 'gold', 'platinum', 'special'],
    default: 'bronze'
  },
  pointsAwarded: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  visibleToRoles: [{
    type: String,
    enum: ['student', 'employer', 'admin'],
    default: ['student', 'employer', 'admin']
  }]
}, {
  timestamps: true
});

// Indexes for faster queries
badgeSchema.index({ 'criteria.type': 1 });
badgeSchema.index({ tier: 1 });
badgeSchema.index({ isActive: 1 });

const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge; 