const Holidays = require('../models/Holiday');

exports.AddHolidays = async (req, res) => {
  const { name, holiday_date, status } = req.body; // Extract data from the request body
  try {

    const parsedHolidayDate = new Date(holiday_date);
    if (isNaN(parsedHolidayDate)) {
      return res.status(400).json({ message: "Invalid holiday date format" });
    }
    // Create a new holiday entry
    const newData = new Holidays({
      name,
      holiday_date: parsedHolidayDate,
      status: status || "Active"  // Set status to "Active" by default if not provided
    });

    // Save the new holiday data
    await newData.save();

    // Send success response
    res.status(200).json({ message: "Holiday Added Successfully." });

  } catch (error) {
    // Handle any errors that occur
    res.status(400).json({ message: "Something went wrong", error: error.message });
  }
};

exports.GetHolidays = async (req, res) => {
    try {
      const List = await Holidays.find();
      res.status(200).json(List);
    } catch (error) {
      console.error("Error fetching holidays:", error);  // Log the error for debugging
      res.status(500).json({ message: "Something went wrong..." });
    }
  };

  
  exports.DeleteHoliday = async (req,res) => {
       const { id } = req.params;
       
       try{
        const deletedHoliday = await Holidays.findByIdAndDelete(id);
        if (!deletedHoliday) {
            return res.status(404).json({ message: "Holiday not found" });
          }


        res.status(200).json({ message: "Holiday deleted successfully" });
       }catch(error){
        res.status(500).json({ message: "Something went wrong..." });
       }
  };



  exports.UpdateHoliday = async (req, res) => {
    const { id } = req.params;  // Get the ID from the URL
    const { name, holiday_date, status } = req.body;  // Get the new values from the request body
  
  
  
    try {
      // Prepare an object with the fields to update
      const updatedData = { name, holiday_date, status };
  
      // Find the holiday by ID and update the fields
      const updatedHoliday = await Holidays.findByIdAndUpdate(id, updatedData, { new: true });
  
      // If no holiday is found with that ID
      if (!updatedHoliday) {
        return res.status(404).json({ message: "Holiday not found" });
      }
  
      // Respond with the updated holiday data
      res.status(200).json({ message: "Holiday updated successfully", updatedHoliday });
    } catch (error) {
      console.error(error);  // Log the error for debugging
      res.status(500).json({ message: "Something went wrong..." });
    }
  };