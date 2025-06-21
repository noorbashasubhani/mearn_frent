const Ledger = require('../models/Ledger');




exports.addLedger = async (req, res) => {
  try {
    const { transaction_type, amount } = req.body;

    // Get the last ledger entry (if any)
    const lastEntry = await Ledger.findOne().sort({ createdAt: -1 });
    const previousBalance = lastEntry?.balance || 0;

    const numericAmount = parseFloat(amount);
    let newBalance = previousBalance;

    if (transaction_type === 'Credit') {
      newBalance += numericAmount;
    } else if (transaction_type === 'Debit') {
      newBalance -= numericAmount;
    }

    const newLedger = new Ledger({
      ...req.body,
      balance: newBalance,
    });

    const saved = await newLedger.save();
    res.status(201).json({ success: true, message: 'Ledger entry added', data: saved });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add ledger entry',
      error: error.message,
    });
  }
};



// Get all ledger entries
exports.getAllLedgers = async (req, res) => {
  try {
    const ledgers = await Ledger.find()
      .populate('bank_id')
      .populate('added_by')
      .populate('edited_by')
      .populate('out_flow_id')
      .populate('inflow_id');
    res.status(200).json({ success: true, data: ledgers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch ledgers', error: error.message });
  }
};

// Get single ledger by ID
exports.getLedgerById = async (req, res) => {
  try {
    const ledger = await Ledger.findById(req.params.id)
      .populate('bank_id')
      .populate('added_by')
      .populate('edited_by')
      .populate('out_flow_id')
      .populate('inflow_id');
    if (!ledger) {
      return res.status(404).json({ success: false, message: 'Ledger not found' });
    }
    res.status(200).json({ success: true, data: ledger });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch ledger', error: error.message });
  }
};

// Update ledger by ID
exports.updateLedger = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Prevent amount and balance from being updated
    delete updateData.amount;
    delete updateData.balance;
    delete updateData.transaction_type;

    const updatedLedger = await Ledger.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedLedger) {
      return res.status(404).json({ success: false, message: "Ledger entry not found" });
    }

    res.status(200).json({ success: true, message: "Ledger entry updated", data: updatedLedger });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update entry", error: error.message });
  }
};


// Delete ledger by ID
exports.deleteLedger = async (req, res) => {
  try {
    const deleted = await Ledger.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Ledger not found' });
    }
    res.status(200).json({ success: true, message: 'Ledger deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete ledger', error: error.message });
  }
};
