const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String},
  designation: { type: String},
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true // <- Automatically adds createdAt & updatedAt
});

module.exports = mongoose.model('Employee', employeeSchema);
