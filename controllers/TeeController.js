const Tee=require('../models/Tee');

// POST /api/tee - Create new form entry
exports.createTee = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newTee = new Tee({
      name,
      email,
      message
    });

    const savedTee = await newTee.save();

    res.status(201).json({
      message: 'Form submitted successfully.',
      data: savedTee
    });

  } catch (error) {
    console.error("Error saving Tee:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllTees = async (req, res) => {
  try {
    const tees = await Tee.find()
    .select('name salary')
    .sort({ createdAt: -1 }); // latest first
    res.status(200).json(tees);
  } catch (error) {
    console.error("Error fetching Tees:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteTee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTee = await Tee.findByIdAndDelete(id);

    if (!deletedTee) {
      return res.status(404).json({ error: 'Entry not found.' });
    }

    res.status(200).json({ message: 'Deleted successfully.' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE Tee by ID
exports.updateTee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const updated = await Tee.findByIdAndUpdate(
      id,
      { name, email, message },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Entry not found.' });
    }
    res.status(200).json({ message: 'Updated successfully.', data: updated });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
