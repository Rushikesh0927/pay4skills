const mongoose = require('mongoose');

const taskApplicationSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  proposedDeadline: {
    type: Date,
    required: true
  },
  attachments: [{
    name: {
      type: String
    },
    url: {
      type: String
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'accepted', 'rejected', 'withdrawn'],
    default: 'applied'
  },
  statusUpdateReason: {
    type: String
  },
  statusUpdatedAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for faster lookups
taskApplicationSchema.index({ task: 1, student: 1 }, { unique: true });
taskApplicationSchema.index({ task: 1, status: 1 });
taskApplicationSchema.index({ student: 1, status: 1 });

const TaskApplication = mongoose.model('TaskApplication', taskApplicationSchema);

module.exports = TaskApplication; 