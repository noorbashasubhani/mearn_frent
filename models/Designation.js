// models/Designation.js
const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department", // References the Department model
    required: true,
  },
});

const Designation = mongoose.model("Designation", designationSchema);

module.exports = Designation;


