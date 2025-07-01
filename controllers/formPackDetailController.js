const FormPackDetail = require('../models/FormPackDetail');
const Leads = require('../models/Lead');
const Caluculation=require('../models/Caluculation');

// CREATE
exports.createFormPackDetail = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Check if related calculation exists and is fully approved
    const calc = await Caluculation.findOne({ doc_id: id });

    if (!calc) {
      return res.status(400).json({
        message: 'Calculation not found for this Lead'
      });
    }

    if (calc.sup_status !== 'A' || calc.sales_status !== 'A' || calc.lead_status !== 'A') {
      return res.status(400).json({
        message: 'Cannot create form. Calculation must be fully approved by all partners (Super, Sales, Lead).'
      });
    }

    // 2. Proceed to create form detail if approved
    const newDetail = new FormPackDetail({
      ...req.body,
      doc_id: id
    });

    const savedDetail = await newDetail.save();

    // 3. Update the lead status
    await Leads.updateOne(
      { _id: id },
      { $set: { itenary_status: 'Q' } }
    );

    res.status(201).json({
      message: 'Form Pack Detail created successfully',
      data: savedDetail
    });

  } catch (error) {
    res.status(500).json({
      message: 'Failed to create detail',
      error: error.message
    });
  }
};

// READ ALL
exports.getAllFormPackDetails = async (req, res) => {
  try {
    const details = await FormPackDetail.find().populate({path:'package_them',select:'destination_name imges'});
    res.status(200).json({message: 'Success data received ...', data: details });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data', error: error.message });
  }
};

// READ SINGLE
exports.getFormPackDetailById = async (req, res) => {
  const {id}=req.params;
  try {
const detail = await FormPackDetail.findOne({ doc_id: id });
    if (!detail) return res.status(404).json({ message: 'Detail not found' });
    res.status(200).json({ data: detail });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch detail', error: error.message });
  }
};

// UPDATE
exports.updateFormPackDetail = async (req, res) => {
    const {id}=req.params;
  try {
    const updatedDetail = await FormPackDetail.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    //if (!updatedDetail) return res.status(404).json({ message: 'Detail not found' });
    const leadId = updatedDetail.doc_id;

    const leadUpdateResult = await Leads.updateOne(
      { _id: leadId },                      // Match the Lead document by _id
      { $set: { itenary_status: 'Q' } } // Set the new status
    );

    res.status(200).json({ message: 'Updated successfully', data: leadUpdateResult });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update detail', error: error.message });
  }
};

// DELETE
exports.deleteFormPackDetail = async (req, res) => {
  try {
    const deleted = await FormPackDetail.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Detail not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete detail', error: error.message });
  }
};
