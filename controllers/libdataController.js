const Libdata = require('../models/Libdata');

exports.createLibdata = async (req, res) => {
  const { name } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Please upload a PDF file' });
  }

  try {
    const newLibdata = new Libdata({
      name,
      libra_pdf: file.path,
    });

    await newLibdata.save();

    res.status(201).json({
      message: 'Libdata created successfully',
      data: newLibdata,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating libdata', error: error.message });
  }
};



// Get all Libdata entries
exports.getAllLibdata = async (req, res) => {
  try {
    // Retrieve all Libdata entries from the database
    const libdata = await Libdata.find();

    // If no entries are found, return a message
    if (libdata.length === 0) {
      return res.status(404).json({ message: 'No Libdata found' });
    }

    // Send a response with all the Libdata entries
    res.status(200).json({
      message: 'Libdata retrieved successfully',
      data: libdata,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving libdata', error: error.message });
  }
};
