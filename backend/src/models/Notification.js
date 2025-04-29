const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'task_application',
      'application_status',
      'task_assigned',
      'task_completed',
      'payment_uploaded',
      'payment_confirmed',
      'payment_disputed',
      'new_message',
      'admin_notice',
      'badge_earned',
      'report_resolution'
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  relatedTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  relatedApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskApplication'
  },
  relatedPayment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  relatedChat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  relatedReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  },
  actionUrl: {
    type: String
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Indexes for faster queries
notificationSchema.index({ recipient: 1, read: 1 });
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ type: 1, recipient: 1 });
notificationSchema.index({ relatedTask: 1 });
notificationSchema.index({ relatedApplication: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification; 