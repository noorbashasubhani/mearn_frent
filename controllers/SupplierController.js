const Supplier = require('../models/Supplier');

// Create or Update Supplier
exports.createSupplier = async (req, res) => {
  try {
    const { doc_id } = req.params;
    const newSupplier = new Supplier({ ...req.body, doc_id });
    const saved = await newSupplier.save();
    res.status(201).json({ message: 'Supplier saved', data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Error saving supplier', error: err.message });
  }
};

// Get all suppliers by doc_id
exports.getSuppliersByDocId = async (req, res) => {
  try {
    const { doc_id } = req.params;
    const suppliers = await Supplier.find({ doc_id });
    res.status(200).json({ data: suppliers });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching suppliers', error: err.message });
  }
};

// Update a supplier by ID
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Supplier.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Supplier updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating supplier', error: err.message });
  }
};

// Delete a supplier by ID
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    await Supplier.findByIdAndDelete(id);
    res.status(200).json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting supplier', error: err.message });
  }
};
