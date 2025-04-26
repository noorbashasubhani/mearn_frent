const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  from_date: {
    type: Date,
  },
  to_date: {
    type: Date,
  },
  no_of_days: {
    type: String,
  },
  leave_type: {
    type: String,
  },
  reason: {
    type: String,
  },
  to_manger: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status:{
    type: String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Leave', leaveSchema);
