const mongoose = require('mongoose');

const InclusionExclusionSchema = new mongoose.Schema({
  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Lead' // or whatever your parent document is
  },
  inclusions: {
    type: [String],
    default: []
  },
  exclusions: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('FormIncExc', InclusionExclusionSchema);
