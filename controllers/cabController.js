const Cab = require("../models/Cab");  // Ensure the path is correct

exports.addCab = async (req, res) => {
  const {
    state_name,
    service_location,
    supplier_name,
    email_contact,
    vehicle_type,
    seating_capacity,
    per_day_cost,
    rate_per_km,
    created_date,
    color_status
  } = req.body;

  // Validate the required fields
  if (!state_name || !service_location || !supplier_name || !vehicle_type) {
    return res.status(400).json({
      message: "State Name, Service Location, Supplier Name, and Vehicle Type are required",
    });
  }

  try {
    // Check if the supplier_name already exists
    const existingCab = await Cab.findOne({ supplier_name });
    if (existingCab) {
      return res.status(400).json({
        message: "Supplier Name already exists. Please choose a different one.",
      });
    }

    // Create a new Cab document
    const newCab = new Cab({
      state_name,
      service_location,
      supplier_name,
      email_contact,
      vehicle_type,
      seating_capacity,
      per_day_cost,
      rate_per_km,
      created_date: created_date || Date.now(),
      color_status,
    });

    // Save the new cab to the database
    await newCab.save();

    res.status(201).json({
      message: "Cab added successfully",
      data: newCab,
    });
  } catch (error) {
    console.error("Error adding cab:", error);
    res.status(500).json({
      message: "Something went wrong while adding the cab",
      error: error.message,
    });
  }
};


exports.cabDatails= async (req,res)=>{
    try{
     const cablist = await Cab.find();
     res.status(200).json(cablist);
    }catch(error){
     res.status().json({message:"Something went Wrong..!",error:error})
    }
}


exports.delCab = async (req, res) => {
  const { id } = req.params;
  try {
    // Corrected the delete query by only using the _id field.
    const del = await Cab.deleteOne({ _id: id });
    if (del.deletedCount === 0) {
      return res.status(404).json({ message: "cab  not found." });
    }
    res.status(200).json({ message: "cab Deleted Successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

exports.updateCab = async (req, res) => {
  const {
    state_name,
    service_location,
    supplier_name,
    email_contact,
    vehicle_type,
    seating_capacity,
    per_day_cost,
    rate_per_km,
    color_status
  } = req.body;
  const { row_id } = req.params;

  try {
    // Use findByIdAndUpdate to update the cab directly
    const updatedCab = await Cab.findByIdAndUpdate(
      row_id,
      {
        state_name,
        service_location,
        supplier_name,
        email_contact,
        vehicle_type,
        seating_capacity,
        per_day_cost,
        rate_per_km,
        color_status
      },
      { new: true } // This will return the updated cab object after the update
    );

    if (!updatedCab) {
      return res.status(404).json({
        message: "Cab not found with the provided ID",
      });
    }

    res.status(200).json({
      message: "Cab details updated successfully",
      data: updatedCab,
    });
  } catch (error) {
    console.error("Error updating cab:", error);
    res.status(500).json({
      message: "Something went wrong while updating the cab",
      error: error.message,
    });
  }
};


