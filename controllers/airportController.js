const Airport = require('../models/Airport');  // Correct import path

exports.createAirport = async (req, res) => {
  const { airport_name, airport_city, airport_code, created_date, status } = req.body;

  // Validate required fields
  if (!airport_name || !airport_city || !airport_code) {
    return res.status(400).json({
      message: "Airport Name, City, and Airport Code are required",
    });
  }

  try {
    // Check if the airport already exists in the database
    const existingAirport = await Airport.findOne({ airport_name });

    if (existingAirport) {
      return res.status(400).json({
        message: "Airport already exists with the given name",
      });
    }

    // Create a new Airport document
    const newAirport = new Airport({
      airport_name,
      airport_city,
      airport_code,
      created_date: created_date || Date.now(),
      status: status || "active",  // Default to "active" if no status is provided
    });

    // Save the new airport to the database
    await newAirport.save();

    // Return the success response along with the newly created airport data
    res.status(201).json({
      message: "Airport added successfully",
      airport: newAirport,  // Send back the created airport object
    });
  } catch (error) {
    console.error("Error adding airport:", error);
    res.status(500).json({
      message: "Something went wrong while adding the airport",
      error: error.message,
    });
  }
};



exports.Airportlist = async (req, res) => {
  try {
    // Fetch all airports from the database
    const airportList = await Airport.find();

    // Send the airport list in the response
    res.status(200).json(airportList);
  } catch (error) {
    console.error("Error fetching airports:", error);

    
  }
};
