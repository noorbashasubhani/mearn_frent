const mongoose = require('mongoose');

const formPackDetailSchema = new mongoose.Schema({
  cost_sheet: {
    type: String
  },
  package_them: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Theam'
  },
  quation_validate: {
    type: Date
  },
  payment_terms: {
    type: String
  },
  // Add any other fields like references or timestamps as needed
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead'
  },
}, {
  timestamps: true // optional, for createdAt and updatedAt fields
});

const FormPackDetail = mongoose.model('FormPackDetail', formPackDetailSchema);

module.exports = FormPackDetail;
