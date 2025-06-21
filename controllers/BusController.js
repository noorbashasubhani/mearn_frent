const Buse = require('../models/Buse'); // Assuming your model is in the 'models' folder

// Create a new bus record
const createBus = async (req, res) => {
    const {row_id}=req.params;
  try {
    const newBus = new Buse({
      fare_source: req.body.fare_source,
      bus_name: req.body.bus_name,
      start_datetime: req.body.start_datetime,
      reach_datetime: req.body.reach_datetime,
      start_city: req.body.start_city,
      reach_city: req.body.reach_city,
      journey_duration: req.body.journey_duration,
      bus_class: req.body.bus_class,
      seats_available: req.body.seats_available,
      cost_considered: req.body.cost_considered,
      loading_on_bus: req.body.loading_on_bus,
      total_bus_fare: req.body.total_bus_fare,
      doc_id:row_id
    });

    const savedBus = await newBus.save();
    res.status(200).json(savedBus);
  } catch (error) {
    res.status(500).json({ message: "Error creating bus record", error: error.message });
  }
};

// Get all bus records
const getAllBuses = async (req, res) => {
  try {
    const buses = await Buse.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bus records", error: error.message });
  }
};

// Get all bus records
const getAllBusesRelated = async (req, res) => {
  const { id } = req.params;

  try {
    const buses = await Buse.find({ doc_id: id }); // ✅ find() with filter object
    res.status(200).json({message:'success',data:buses});
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bus records",
      error: error.message
    });
  }
};


// Get a bus record by ID
const getBusById = async (req, res) => {
  try {
    const bus = await Buse.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bus record", error: error.message });
  }
};

// Update a bus record
const updateBus = async (req, res) => {
  try {
    const updatedBus = await Buse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json(updatedBus);
  } catch (error) {
    res.status(500).json({ message: "Error updating bus record", error: error.message });
  }
};

// Delete a bus record
const deleteBus = async (req, res) => {
  try {
    const deletedBus = await Buse.findByIdAndDelete(req.params.id);
    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json({ message: "Bus record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bus record", error: error.message });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
  getAllBusesRelated
};
