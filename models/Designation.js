// models/Designation.js
const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
  name: {
    type: String
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },
});

const Designation = mongoose.model("Designation", designationSchema);

module.exports = Designation;


