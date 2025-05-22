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
    const flights = await Flight.find().populate({
      path: 'doc_id',
      select: 'name email' // adjust according to your Lead schema
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
    const flight = await Flight.findById(req.params.id).populate('doc_id');
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching flight',
      error: error.message
    });
  }
};

// Delete flight by ID
exports.deleteFlight = async (req, res) => {
  try {
    const deleted = await Flight.findByIdAndDelete(req.params.id);
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
