const mongoose = require("mongoose");

const theamTest = mongoose.Schema({
  name: { type: String },
  department: { type: String },
  designation: { type: String },
  salary: { type: Number },
  rank: { type: Number },
  joining_date: { type: String },
  status: { type: String }
}, {
  timestamps: true
});

// Recommended export style
const Test = mongoose.model("Test", theamTest);
module.exports = Test;
