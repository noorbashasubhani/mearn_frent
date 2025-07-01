const Proforma = require('../models/Proforma');

// Create a new proforma
exports.createProforma = async (req, res) => {
  try {
    const proforma = new Proforma(req.body);
    await proforma.save();
    res.status(201).json({ message: 'Proforma created successfully', data: proforma });
  } catch (err) {
    res.status(400).json({ message: 'Error creating proforma', error: err.message });
  }
};

// Get all proformas
exports.getAllProformas = async (req, res) => {
  try {
    const proformas = await Proforma.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Success', data: proformas });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching proformas', error: err.message });
  }
};

// Get one proforma by ID
exports.getProformaById = async (req, res) => {
  try {
    const proforma = await Proforma.findById(req.params.id);
    if (!proforma) return res.status(404).json({ message: 'Proforma not found' });
    res.status(200).json({ data: proforma });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching proforma', error: err.message });
  }
};

// Update a proforma
exports.updateProforma = async (req, res) => {
  try {
    const updated = await Proforma.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Proforma not found' });
    res.status(200).json({ message: 'Proforma updated successfully', data: updated });
  } catch (err) {
    res.status(400).json({ message: 'Error updating proforma', error: err.message });
  }
};

// Delete a proforma
exports.deleteProforma = async (req, res) => {
  try {
    const deleted = await Proforma.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Proforma not found' });
    res.status(200).json({ message: 'Proforma deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting proforma', error: err.message });
  }
};
