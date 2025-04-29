const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillsRequired: [{
    type: String,
    required: true,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: Number,
    required: true
  },
  deadline: {
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
    enum: ['open', 'in_progress', 'pending_closure', 'closed', 'cancelled'],
    default: 'open'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'disputed'],
    default: 'pending'
  },
  paymentProof: {
    url: {
      type: String
    },
    uploadedAt: {
      type: Date
    },
    confirmedAt: {
      type: Date
    }
  },
  completionDetails: {
    submittedAt: {
      type: Date
    },
    deliverables: [{
      description: {
        type: String
      },
      fileUrl: {
        type: String
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String
      },
      givenAt: {
        type: Date
      }
    }
  }
}, {
  timestamps: true
});

// Indexes for faster queries
taskSchema.index({ status: 1 });
taskSchema.index({ category: 1 });
taskSchema.index({ employer: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ skillsRequired: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; 