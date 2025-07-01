const Receipt = require('../models/Receipt');

// Add a new receipt
exports.createReceipt = async (req, res) => {
  try {
    const {
      doc_id,
      date_of_issue,
      payment_type,
      total_cost,
      payment_received
    } = req.body;

    const pending_payment = total_cost - payment_received;

    const newReceipt = new Receipt({
      doc_id,
      date_of_issue,
      payment_type,
      total_cost,
      payment_received,
      pending_payment
    });

    const savedReceipt = await newReceipt.save();
    res.status(201).json({ message: 'Receipt created successfully', data: savedReceipt });
  } catch (error) {
    res.status(500).json({ message: 'Error creating receipt', error: error.message });
  }
};

// Get all receipts
exports.getAllReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find()
      .populate('doc_id')
      .populate('added_by');
    res.status(200).json({ message: 'Success', data: receipts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching receipts', error: error.message });
  }
};

// Get a single receipt by ID
exports.getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate('doc_id')
      .populate('added_by');
    if (!receipt) return res.status(404).json({ message: 'Receipt not found' });
    res.status(200).json({ message: 'Success', data: receipt });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching receipt', error: error.message });
  }
};

// Update a receipt
exports.updateReceipt = async (req, res) => {
  try {
    const {
      doc_id,
      date_of_issue,
      payment_type,
      total_cost,
      payment_received
    } = req.body;

    const pending_payment = total_cost - payment_received;

    const updatedReceipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      {
        doc_id,
        date_of_issue,
        payment_type,
        total_cost,
        payment_received,
        pending_payment
      },
      { new: true }
    );

    if (!updatedReceipt) return res.status(404).json({ message: 'Receipt not found' });

    res.status(200).json({ message: 'Receipt updated successfully', data: updatedReceipt });
  } catch (error) {
    res.status(500).json({ message: 'Error updating receipt', error: error.message });
  }
};

// Delete a receipt
exports.deleteReceipt = async (req, res) => {
  try {
    const deleted = await Receipt.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Receipt not found' });
    res.status(200).json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting receipt', error: error.message });
  }
};
