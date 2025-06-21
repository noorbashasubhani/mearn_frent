const FormIncExc = require('../models/FormIncExc');

// Create or Update (Upsert)
exports.createOrUpdateFormIncExc = async (req, res) => {
  const { id } = req.params; // doc_id passed via URL
  const { inclusions, exclusions } = req.body;

  try {
    const data = await FormIncExc.findOneAndUpdate(
      { doc_id: id },
      {
        doc_id: id,
        inclusions: inclusions || [],
        exclusions: exclusions || []
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: 'FormIncExc saved successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Get by doc_id
exports.getFormIncExc = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await FormIncExc.findOne({ doc_id: id });
    if (!data) {
      return res.status(404).json({ message: 'FormIncExc not found' });
    }
    res.status(200).json({ message: 'Data fetched successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};


exports.getFormAllIncExc = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await FormIncExc.find();
    if (!data) {
      return res.status(404).json({ message: 'FormIncExc not found' });
    }
    res.status(200).json({ message: 'Data fetched successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};


exports.getByDocId = async (req, res) => {
  try {
    const data = await FormIncExc.findOne({ doc_id: req.params.id });

    if (!data) return res.status(404).json({ message: 'Data not found' });

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



exports.createOrUpdate = async (req, res) => {
  const { doc_id } = req.params;
  const { inclusions, exclusions } = req.body;

  try {
    let record = await FormIncExc.findOne({ doc_id });

    if (record) {
      // Update existing
      record.inclusions = inclusions || [];
      record.exclusions = exclusions || [];
      await record.save();
      return res.status(200).json({ message: 'Updated successfully', data: record });
    } else {
      // Create new
      const newRecord = new FormIncExc({
        doc_id,
        inclusions,
        exclusions
      });
      await newRecord.save();
      return res.status(201).json({ message: 'Created successfully', data: newRecord });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};