const mongoose = require('mongoose');

const teeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },  // ✅ Should be String
    message: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Tee', teeSchema);
