const DailySales = require('../models/DailySale'); // Adjust the path if needed

// Add a new daily sales entry
exports.addDailySales = async (req, res) => {
  try {
    const { team_id, executive_ids, year_month, no_of_confirms, targets } = req.body;

    if (
      !team_id ||
      !executive_ids ||
      !year_month ||
      !no_of_confirms ||
      !targets ||
      executive_ids.length !== no_of_confirms.length ||
      executive_ids.length !== targets.length
    ) {
      return res.status(400).json({ message: 'Invalid data or mismatched array lengths.' });
    }

    // ✅ Check for duplicate entry
    const existing = await DailySales.findOne({ team_id, year_month });
    if (existing) {
      return res.status(409).json({ message: 'Sales entry for this team and month already exists.' });
    }

    const newEntry = new DailySales({
      team_id,
      executive_ids,
      year_month,
      no_of_confirms,
      targets
    });

    await newEntry.save();
    res.status(201).json({ message: 'Daily Sales entry added successfully', data: newEntry });
  } catch (error) {
    console.error('Error adding daily sales:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get all daily sales (optionally filter by team_id or year_month)
exports.getDailySales = async (req, res) => {
  try {
    const { team_id, year_month } = req.query;

    const filter = {};
    if (team_id) filter.team_id = team_id;
    if (year_month) filter.year_month = year_month;

    const data = await DailySales.find(filter)
      .populate('team_id', 'team_name')
      .populate('executive_ids', 'first_name last_name');

    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    console.error('Error fetching daily sales:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an existing daily sales entry
exports.updateDailySales = async (req, res) => {
  try {
    const { id } = req.params;
    const { team_id, executive_ids, year_month, no_of_confirms, targets } = req.body;

    if (
      executive_ids.length !== no_of_confirms.length ||
      executive_ids.length !== targets.length
    ) {
      return res.status(400).json({ message: 'Array lengths must match' });
    }

    const updated = await DailySales.findByIdAndUpdate(
      id,
      {
        team_id,
        executive_ids,
        year_month,
        no_of_confirms,
        targets
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Daily Sales record not found' });
    }

    res.status(200).json({ message: 'Updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating daily sales:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an entry
exports.deleteDailySales = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await DailySales.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Daily Sales record not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting daily sales:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
