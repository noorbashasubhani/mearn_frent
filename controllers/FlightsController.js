const Flight = require('../models/Flight');

// Add a flight
exports.addFlight = async (req, res) => {
  const { row_id } = req.params;

  try {
    const flightData = new Flight({
      ...req.body,
      doc_id: row_id
    });

    const savedFlight = await flightData.save();

    res.status(201).json({
      message: 'Flight data saved successfully',
      flight: savedFlight
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to save flight data',
      error: error.message
    });
  }
};

// Get all flights
exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find()
  .populate({
    path: 'doc_id',
    select: 'name email' // from Lead schema
  })
   .populate({
    path: 'r_from_city',
    select: 'airport_name airport_code' // from Airport schema
  })
   .populate({
    path: 'r_to_city',
    select: 'airport_name airport_code' // from Airport schema
  })
  .populate({
    path: 'on_from_city',
    select: 'airport_name airport_code' // from Airport schema
  })
  .populate({
    path: 'on_to_city',
    select: 'airport_name airport_code' // from Airport schema
  });


    res.status(200).json({
      message: 'Flight data fetched successfully',
      flights
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch flight data',
      error: error.message
    });
  }
};

// Get flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.find({doc_id:req.params.id}).populate('doc_id');
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({message:'success',data:flight});
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching flight',
      error: error.message
    });
  }
};

// Delete flight by ID
exports.deleteFlight = async (req, res) => {
  const {row_id}=req.params;
  try {
    const deleted = await Flight.findByIdAndDelete(row_id);
    if (!deleted) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting flight',
      error: error.message
    });
  }
};


exports.updateFlights=async(req,res)=>{
  const {row_id}=req.params;
  const newData=req.body;
   try{

    const updata=await Flight.findByIdAndUpdate(row_id,newData,{new:true});
    if(!updata){
      return res.status(404).json({ message: 'Flight not found' });
    }
    return res.status(200).json({ message: 'Success',data:updata });
   }catch(error){
    res.status(500).json({
      message: 'Error deleting flight',
      error: error.message
    });
   }
}