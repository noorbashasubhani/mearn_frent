const mongoose = require('mongoose');

const DailySalesSchema = new mongoose.Schema({
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  executive_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming executives are users
      required: true
    }
  ],
  year_month: {
    type: String, // Format: "YYYY-MM" (e.g., "2025-06")
    required: true
  },
  no_of_confirms: [
    {
      type: Number,
      default: 0
    }
  ],
  targets: [
    {
      type: Number,
      default: 0
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DailySale', DailySalesSchema);
