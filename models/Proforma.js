// models/Proforma.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  description: String,
  pax: Number,
  costPerPax: Number,
  total: Number, // Optional: can be computed in frontend
});

const proformaSchema = new mongoose.Schema({
  dateOfIssue: { type: Date },
  customerName: { type: String },
  destination: { type: String },
  startDate: { type: Date },
  gstNumber: { type: String },
  address: { type: String },
  gstPercent: { type: Number, default: 0 },
  rows: [serviceSchema],
  subtotal: { type: Number },
  gstAmount: { type: Number },
  totalPayable: { type: Number },
  totalPackageCost: { type: Number }
},{timestamps:true});

module.exports = mongoose.model('Proforma', proformaSchema);
