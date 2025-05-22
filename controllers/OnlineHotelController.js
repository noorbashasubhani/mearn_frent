const Onlinehotel = require('../models/Onlinehotel');

exports.addOnlineHotels = async (req, res) => {
    const {row_id}=req.params;
  try {
    //const hotelData = new Onlinehotel(req.body);

    const hotelData = new Onlinehotel({
      ...req.body,
      doc_id: row_id // attach the doc_id from route param
    });

    const savedHotel = await hotelData.save();

    res.status(201).json({
      message: 'Hotel data saved successfully',
      hotel: savedHotel
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to save hotel data',
      error: error.message
    });
  }
};


exports.getOnlineHotels = async (req, res) => {
  try {
    const hotels = await Onlinehotel.find();
    res.status(200).json({
      message: 'Hotel data fetched successfully',
      hotels
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch hotel data',
      error: error.message
    });
  }
};