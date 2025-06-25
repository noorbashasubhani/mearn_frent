const Reimbursement = require('../models/Reimbursement');

exports.addRes=async (req, res) => {
  try {
    const data = new Reimbursement(req.body);
    await data.save();
    res.status(200).json({ message: 'Reimbursement saved' });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err });
  }
};


exports.getAllRes = async (req, res) => {
  try {
    const data = await Reimbursement.find()
      .populate('managers', 'first_name last_name') // if managers are ref to Employee model
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reimbursements', error: err.message });
  }
};


// controllers/reimbursementController.js
exports.upDate = async (req, res) => {
  try {
    const data = await Reimbursement.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },    // only update status field
      { new: true }                   // return the updated document
    );
    if (!data) {
      return res.status(404).json({ message: 'Reimbursement not found.' });
    }
    res.status(200).json({ message: 'Status updated successfully.', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating status.', error: err.message });
  }
};
