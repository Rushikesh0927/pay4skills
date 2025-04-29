const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  files: [{
    name: {
      type: String
    },
    url: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: Number
    }
  }],
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  isSystemMessage: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const chatSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [messageSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  lastMessage: {
    text: {
      type: String
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Indexes for faster queries
chatSchema.index({ task: 1 });
chatSchema.index({ participants: 1 });
chatSchema.index({ "messages.sender": 1 });
chatSchema.index({ "messages.createdAt": -1 });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat; 