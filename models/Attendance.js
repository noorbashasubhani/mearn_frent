const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Make sure this matches your User model
    
  },
  attendance_status: {
    type: String,
    enum: ['P', 'C', 'H', 'L'], // Present, Casual, Half Day, LOP
    
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0), // normalize date (no time)
    
  },
  marked_date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0), // normalize date (no time)
    
  },
  marked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or 'Admin' based on your structure
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
