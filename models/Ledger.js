const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LedgerSchema = new Schema({
  transaction_type: {
    type: String, // e.g., 'inflow' or 'outflow'
    enum: ['Debit', 'Credit']
  },
  bank_transaction_date: {
    type: Date
  },
  transaction_towards: {
    type: String // e.g., 'purchase', 'salary', etc.
  },
  ghrn_no: {
    type: String
  },
  out_flow_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Outflow' // Change to actual model name
  },
  out_flow_expencess: {
    type: String
  },
  inflow_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inflow' // Change to actual model name
  },
  transaction_perticular: {
    type: String
  },
  bank_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank'
  },
  amount: {
    type: Number
  },
  balance: {
    type: Number
  },
  note: {
    type: String
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  edited_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ledger', LedgerSchema);
