const Deduction = require('../models/Deduction');

exports.createDeduction = async (req, res) => {
  try {
    const deduction = new Deduction(req.body);
    await deduction.save();
    res.status(201).json({ message: 'Deduction created', data: deduction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating deduction', error: err.message });
  }
};

exports.listDeductions = async (req, res) => {
  try {
    const list = await Deduction.find()
      .populate('partnerId','first_name')
      .sort({ createdAt: -1 });
    res.status(200).json({ data: list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching deductions', error: err.message });
  }
};
