const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead', // or the appropriate model name you’re linking to
    required: true
  },
  date_of_issue: {
    type: Date,
    required: true
  },
  payment_type: {
    type: String,
    enum: ['Cash', 'Bank Transfer', 'Cheque', 'Card', 'UPI', 'Other'], // customize as needed
    required: true
  },
  total_cost: {
    type: Number,
    required: true
  },
  payment_received: {
    type: Number,
    required: true,
    default: 0
  },
  pending_payment: {
    type: Number,
    required: true,
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
