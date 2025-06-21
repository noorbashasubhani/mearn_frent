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
      data:hotels
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch hotel data',
      error: error.message
    });
  }
};

exports.getOnlineHotelsel = async (req, res) => {
  try {
    const hotels = await Onlinehotel.find({doc_id:req.params.id});
    res.status(200).json({
      message: 'Hotel data fetched successfully',
      data:hotels
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch hotel data',
      error: error.message
    });
  }
};



exports.delOnline = async (req, res) => {
  const { row_id } = req.params;
  try {
    const delOnl = await Onlinehotel.findByIdAndDelete(row_id);
    if (!delOnl) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json({ message: 'Hotel deleted successfully', data: delOnl });
  } catch (err) {
    res.status(500).json({ message: 'Failed', error: err.message });
  }
};

exports.updateOnline=async(req,res)=>{
const {row_id}=req.params;
const newData=req.body;
  try{
    const update=await Onlinehotel.findByIdAndUpdate(row_id,newData,{new:true});
    if (!update) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
   res.status(200).json({ message: 'successfully', data: update });
  }catch(err){
    res.status(500).json({ message: 'Failed', error: err.message });
  }
}
