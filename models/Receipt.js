const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead'
  },
  date_of_issue: {
    type: Date
  },
  payment_type: {
    type: String
  },
  total_cost: {
    type: Number
  },
  payment_received: {
    type: Number,
    default: 0
  },
  pending_payment: {
    type: Number,
    default: 0
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // optional: who added this receipt
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Receipt', receiptSchema);
