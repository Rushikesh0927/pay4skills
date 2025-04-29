const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  paymentDate: {
    type: Date
  },
  paymentMethod: {
    type: String
  },
  paymentScreenshot: {
    url: {
      type: String
    },
    uploadedAt: {
      type: Date
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'disputed', 'cancelled'],
    default: 'pending'
  },
  statusUpdatedAt: {
    type: Date
  },
  statusUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  disputeDetails: {
    reason: {
      type: String
    },
    description: {
      type: String
    },
    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    raisedAt: {
      type: Date
    },
    evidence: [{
      description: {
        type: String
      },
      fileUrl: {
        type: String
      },
      uploadedAt: {
        type: Date
      }
    }],
    resolution: {
      resolvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      resolution: {
        type: String
      },
      resolvedAt: {
        type: Date
      }
    }
  }
}, {
  timestamps: true
});

// Indexes for faster queries
paymentSchema.index({ task: 1 });
paymentSchema.index({ employer: 1 });
paymentSchema.index({ student: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ "disputeDetails.raisedBy": 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment; 