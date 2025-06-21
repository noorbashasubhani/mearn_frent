const HotelDetail = require('../models/DomesticHotel'); // Adjust path if different

// CREATE new hotel detail for a given doc_id
exports.createHotelDetail = async (req, res) => {
  try {
    const { id } = req.params; // Get doc_id from URL
    const hotelDetail = new HotelDetail({
      ...req.body,
      doc_id: id // Attach doc_id to payload
    });

    await hotelDetail.save();
    res.status(201).json(hotelDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// GET all hotel details by doc_id
exports.getHotelDetailsByDocId = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await HotelDetail.find({ doc_id: id }).populate('hotel_id');
    res.status(200).json({message:'success',data:list});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a hotel detail by _id
exports.updateHotelDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await HotelDetail.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a hotel detail by _id
exports.deleteHotelDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await HotelDetail.findByIdAndDelete(id);
    res.json({ message: 'Hotel detail deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
