const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportType: {
    type: String,
    enum: ['user', 'task', 'message'],
    required: true
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reportedTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  reportedMessage: {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  reason: {
    type: String,
    required: true,
    enum: [
      'spam',
      'inappropriate_content',
      'harassment',
      'fraud',
      'intellectual_property_violation',
      'impersonation',
      'false_information',
      'payment_issue',
      'other'
    ]
  },
  description: {
    type: String,
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
    enum: ['pending', 'under_review', 'resolved', 'rejected'],
    default: 'pending'
  },
  adminNotes: {
    type: String
  },
  resolutionDetails: {
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolution: {
      type: String
    },
    actionTaken: {
      type: String,
      enum: ['no_action', 'warning_issued', 'account_blocked', 'content_removed', 'other']
    },
    resolvedAt: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Indexes for faster queries
reportSchema.index({ status: 1 });
reportSchema.index({ reportType: 1 });
reportSchema.index({ reporter: 1 });
reportSchema.index({ reportedUser: 1 });
reportSchema.index({ reportedTask: 1 });
reportSchema.index({ "reportedMessage.chatId": 1 });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report; 