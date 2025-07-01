const GSTInvoice = require('../models/gstInvoice'); // adjust path as needed

// Create a new GST Invoice
exports.createGSTInvoice = async (req, res) => {
  try {
    const invoice = new GSTInvoice(req.body);
    await invoice.save();
    res.status(201).json({ message: 'Invoice created successfully', data: invoice });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create invoice', error: error.message });
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await GSTInvoice.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Invoices fetched successfully', data: invoices });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoices', error: error.message });
  }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await GSTInvoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice fetched successfully', data: invoice });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch invoice', error: error.message });
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const updated = await GSTInvoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update invoice', error: error.message });
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await GSTInvoice.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete invoice', error: error.message });
  }
};
