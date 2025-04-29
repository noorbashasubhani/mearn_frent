const mongoose = require('mongoose');
const Lead = require('../models/Lead');
const Team = require('../models/Team');
const User = require('../models/User'); // Ensure the User model is required if needed


exports.addLead = async (req, res) => {
  const {
    customer_name,
    customer_number,
    customer_email,
    holiday_type,
    holiday_desc,
    lead_location,
    lead_source,
    partner_id,
    executive_changed_by,
  } = req.body;

  // Get user ID from the request (assumed to be passed in the token)
  const user_id = req.user.userId;

  try {
    // Fetch the team based on the holiday_type (i.e., travel_type)
    const team = await Team.findOne({ travel_type: holiday_type }); // Use findOne to fetch a single team
    if (!team) {
      return res.status(400).json({ message: 'Team not found for the specified holiday type.' });
    }

    // Get the list of team employees (executives)
    const teamExecutives = team.team_employees;
    if (!teamExecutives || teamExecutives.length === 0) {
      return res.status(400).json({ message: 'No executives found in the team.' });
    }

    // Fetch the most recent lead to find the last operation executive
    const lastLead = await Lead.findOne({ holiday_type }).sort({ createdAt: -1 }); // Fetch last lead by holiday_type
    let nextExecutive = null;

    if (lastLead) {
      // Get the operation executive of the last lead
      const lastExecutiveId = lastLead.operation_executive;

      // Find the index of the last executive in the team
      const lastExecutiveIndex = teamExecutives.findIndex(executive => executive._id.toString() === lastExecutiveId.toString());

      if (lastExecutiveIndex !== -1) {
        // Find the next executive in the list (cycle to the first one if at the end)
        const nextIndex = (lastExecutiveIndex + 1) % teamExecutives.length;
        nextExecutive = teamExecutives[nextIndex];
      } else {
        // If no previous executive is found in the team, assign the first executive
        nextExecutive = teamExecutives[0];
      }
    } else {
      // If no previous lead is found, assign the first executive
      nextExecutive = teamExecutives[0];
    }
    //const validPartnerId = partner_id && mongoose.Types.ObjectId.isValid(partner_id) ? mongoose.Types.ObjectId(partner_id) : null;
    const validPartnerId = partner_id && mongoose.Types.ObjectId.isValid(partner_id)
    ? new mongoose.Types.ObjectId(partner_id) // Correctly use `new` with ObjectId
    : null;
    // Create the new Lead document
    const newLead = new Lead({
      customer_name,
      customer_number,
      customer_email,
      holiday_type,
      holiday_desc,
      lead_location,
      lead_source,
      raised_by: user_id, // User who raised the lead
      operation_executive: nextExecutive._id, // Assign the next executive
      previous_operation_executive: lastLead ? lastLead.operation_executive : null, // Store the previous executive for future reference
      partner_id:validPartnerId,
      my_operation_executive:nextExecutive._id,
      lead_status: 'L', // Default status as 'L'
    });

    // Save the new lead to the database
    const savedLead = await newLead.save();

    const populatedLead = await Lead.findById(savedLead._id)
  .populate("raised_by", "first_name last_name")
  .populate("operation_executive", "first_name last_name")
  .populate("my_operation_executive", "first_name last_name")
  .populate("partner_id", "first_name last_name")
  .populate("executive_changed_by", "first_name last_name");

    // Respond with success
    res.status(200).json({ message: 'Lead added successfully and assigned to the next executive.', data: populatedLead });
  } catch (err) {
    // Error handling
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};


exports.getLead = async (req, res) => {
  try {
    // Fetch all leads from the database
    const responses = await Lead.find({lead_status:'L'})
  .populate("raised_by", "first_name last_name") // Populating raised_by with first_name and last_name
  .populate("operation_executive", "first_name last_name") // Populating operation_executive with first_name and last_name
  .populate("my_operation_executive", "first_name last_name") // Populating my_operation_executive with first_name and last_name
  .populate("partner_id", "first_name last_name") // Populating partner_id with first_name and last_name
  .populate("executive_changed_by", "first_name last_name"); // Populating executive_changed_by with first_name and last_name


    // Send the response with status 200 and the data
    res.status(200).json({ message: 'Leads fetched successfully', data: responses });
  } catch (err) {
    // Error handling
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};


exports.update=async(req,res)=>{
    const {status}=req.body;
    const {row_id}=req.params;
    try{
        const updatedLead = await Lead.findByIdAndUpdate(
            row_id, // The ID of the lead you want to update
            { lead_status:status }, // The fields you want to update
            { new: true } // Return the updated lead
          );
          if (!updatedLead) {
            return res.status(404).json({ message: 'Lead not found' });
          }
        res.status(200).json({ message: 'Leads successfully', data: updatedLead });
    }catch(err){
        res.status(500).json({ message: 'Error occurred', error: err.message }); 
    }
}


exports.updateAssign=async(req,res)=>{
  const {operation_executive,reason}=req.body;
  const {row_id}=req.params;
  try{
      const updatedLead = await Lead.findByIdAndUpdate(
          row_id, // The ID of the lead you want to update
          { operation_executive:operation_executive,reason:reason }, // The fields you want to update
          { new: true } // Return the updated lead
        );
        if (!updatedLead) {
          return res.status(404).json({ message: 'Lead not found' });
        }


        const populatedLead = await Lead.findById(updatedLead._id)
        .populate("raised_by", "first_name last_name")
        .populate("operation_executive", "first_name last_name")
        .populate("my_operation_executive", "first_name last_name")
        .populate("partner_id", "first_name last_name")
        .populate("executive_changed_by", "first_name last_name");



      res.status(200).json({ message: 'Leads Assigned successfully', data: populatedLead });
  }catch(err){
      res.status(500).json({ message: 'Error occurred', error: err.message }); 
  }
}


exports.getLeadRnr = async (req, res) => {
  try {
    // Fetch all leads from the database
    const responses = await Lead.find({lead_status:'R'})
  .populate("raised_by", "first_name last_name") // Populating raised_by with first_name and last_name
  .populate("operation_executive", "first_name last_name") // Populating operation_executive with first_name and last_name
  .populate("my_operation_executive", "first_name last_name") // Populating my_operation_executive with first_name and last_name
  .populate("partner_id", "first_name last_name") // Populating partner_id with first_name and last_name
  .populate("executive_changed_by", "first_name last_name"); // Populating executive_changed_by with first_name and last_name


    // Send the response with status 200 and the data
    res.status(200).json({ message: 'Leads fetched successfully', data: responses });
  } catch (err) {
    // Error handling
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};



exports.processed = async (req, res) => {
  const {
    customer_name, customer_number, customer_email, holiday_type, lead_source, partner_id, package_type, customer_type,
    preferred_time, customer_location, start_city, holiday_destination, visiting_city, start_date, end_date, duration,
    no_of_adults, no_of_children, no_of_infants, no_of_pax, transformation_mode, trans_from_city, trans_to_city,
    hotel_standed, hotel_type, room_sharing_type, room_prefaring, no_of_rooms, meals_plan, food_prefaring,
    accomdation_prefaring, meals_prefaring, sight_prefaring, special_includes, do_you_want, your_inputs,proceesed_by
  } = req.body;

  const user_id = req.user.userId;
  const { row_id } = req.params;



  const updateData = {
    customer_name, customer_number, customer_email, holiday_type, lead_source, package_type, customer_type,
    preferred_time, customer_location, start_city, holiday_destination, visiting_city, start_date, end_date, duration,
    no_of_adults, no_of_children, no_of_infants, no_of_pax, transformation_mode, trans_from_city, trans_to_city,
    hotel_standed, hotel_type, room_sharing_type, room_prefaring, no_of_rooms, meals_plan, food_prefaring,proceesed_by:user_id,
    accomdation_prefaring, meals_prefaring, sight_prefaring, special_includes, do_you_want, your_inputs,lead_status:'I'
  };

  if (partner_id && mongoose.Types.ObjectId.isValid(partner_id)) {
    updateData.partner_id = partner_id;
  }
  
  
  
  try {
    const result = await Lead.findByIdAndUpdate(
      row_id,
      updateData,
      { new: true } // Option to return the updated document
    );
    if (result) {
      res.status(200).json({ message: 'Lead updated successfully', data: result });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};
