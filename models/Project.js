const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  project_name: String,
  employeeids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Project', projectSchema);
