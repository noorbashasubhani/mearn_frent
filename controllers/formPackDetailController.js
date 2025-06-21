const FormPackDetail = require('../models/FormPackDetail');
const Leads = require('../models/Lead');

// CREATE
exports.createFormPackDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const newDetail = new FormPackDetail({
      ...req.body,
      doc_id: id // assuming you want to associate the form detail with this ID
    });
    const savedDetail = await newDetail.save();
    const leadUpdateResult = await Leads.updateOne(
      { _id: id },                      // Match the Lead document by _id
      { $set: { itenary_status: 'Q' } } // Set the new status
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
