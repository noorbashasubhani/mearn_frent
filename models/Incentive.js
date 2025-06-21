const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  month_year: {
    type: String, 
  },
  incentives: {
    type: Number,
    default: 0
  },
  advance: {
    type: Number,
    default: 0
  },
  other_deduction: {
    type: Number,
    default: 0
  },
  pf_deduction: {
    type: Number,
    default: 0
  },
  prof_tax: {
    type: Number,
    default: 0
  },
  accident_insurance: {
    type: Number,
    default: 0
  },
  payslop_status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  modeOfPay:{
   Type:String
  },
  finaly_paid: {
    type: Number,
    default: 0
  },
  issuanceDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Incentive', payrollSchema);  // ✅ Correct
