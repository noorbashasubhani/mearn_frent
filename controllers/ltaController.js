const LTA = require('../models/LTA'); // adjust path as needed

// Create a new LTA entry
exports.createLTA = async (req, res) => {
  try {
    const ltaData = req.body;

    const newLTA = new LTA(ltaData);
    await newLTA.save();

    res.status(201).json({ message: 'LTA record created successfully', data: newLTA });
  } catch (err) {
    console.error('Error creating LTA:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all LTA records
exports.getAllLTA = async (req, res) => {
  try {
    const ltas = await LTA.find().sort({ date_of_issue: -1 });
    res.status(200).json({ message: 'Success', data: ltas });
  } catch (err) {
    console.error('Error fetching LTA records:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get LTA by ID
exports.getLTAById = async (req, res) => {
  try {
    const lta = await LTA.findById(req.params.id);
    if (!lta) {
      return res.status(404).json({ message: 'LTA not found' });
    }
    res.status(200).json({ message: 'Success', data: lta });
  } catch (err) {
    console.error('Error fetching LTA by ID:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update LTA by ID
exports.updateLTA = async (req, res) => {
  try {
    const updated = await LTA.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ message: 'LTA not found' });
    }
    res.status(200).json({ message: 'LTA updated successfully', data: updated });
  } catch (err) {
    console.error('Error updating LTA:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete LTA by ID
exports.deleteLTA = async (req, res) => {
  try {
    const deleted = await LTA.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'LTA not found' });
    }
    res.status(200).json({ message: 'LTA deleted successfully' });
  } catch (err) {
    console.error('Error deleting LTA:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


