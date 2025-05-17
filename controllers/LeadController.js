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


exports.getLeadsdetails = async (req, res) => {
  const {lead_id}=req.params;
  try {
    const responses = await Lead.findById(lead_id);
    res.status(200).json({ message: 'Leads fetched successfully its', data: responses });
  } catch (err) {
    // Error handling
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};

exports.getSearchLeadsdetails = async (req, res) => {
  const {lead_id}=req.params;
  try {
    const responses = await Lead.find().limit(100);
    res.status(200).json({ message: 'Leads fetched successfully its', data: responses });
  } catch (err) {
    // Error handling
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};

exports.getLead = async (req, res) => {
  try {
    const responses = await Lead.find({lead_status:'L'})
  .populate("raised_by", "first_name last_name") // Populating raised_by with first_name and last_name
  .populate("operation_executive", "first_name last_name") // Populating operation_executive with first_name and last_name
  .populate("my_operation_executive", "first_name last_name") // Populating my_operation_executive with first_name and last_name
  .populate("partner_id", "first_name last_name") // Populating partner_id with first_name and last_name
  .populate("executive_changed_by", "first_name last_name") // Populating executive_changed_by with first_name and last_name
  .populate("previous_operation_executive", "first_name last_name");
    res.status(200).json({ message: 'Leads fetched successfully', data: responses });
  } catch (err) {
    // Error handling
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};

exports.getItenery = async (req, res) => {
  try {
    const responses = await Lead.find({lead_status:'I',itenary_status:'P'})
  .populate("raised_by", "first_name last_name") // Populating raised_by with first_name and last_name
  .populate("operation_executive", "first_name last_name") // Populating operation_executive with first_name and last_name
  .populate("my_operation_executive", "first_name last_name") // Populating my_operation_executive with first_name and last_name
  .populate("partner_id", "first_name last_name") // Populating partner_id with first_name and last_name
  .populate("executive_changed_by", "first_name last_name") // Populating executive_changed_by with first_name and last_name
  .populate("previous_operation_executive", "first_name last_name");
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
  const user_id = req.user.userId;
  try{
      const updatedLead = await Lead.findByIdAndUpdate(
          row_id, // The ID of the lead you want to update
          { operation_executive:operation_executive,reason:reason,executive_changed_by:user_id }, // The fields you want to update
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
        .populate("previous_operation_executive", "first_name last_name")
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


exports.deleteLead = async (req, res) => {
  try {
    // Fetch all leads from the database
    const responses = await Lead.find({lead_status:'D'})
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
    accomdation_prefaring, meals_prefaring, sight_prefaring, special_includes, do_you_want, your_inputs,proceesed_by,emi_amount
    ,budget_amount,visa,ticket,honey,day_break,insurance,early,activity,chekcout,guide,dinner
  } = req.body;

  const user_id = req.user.userId;
  const { lead_id } = req.params;



  const updateData = {
    customer_name, customer_number, customer_email, holiday_type, lead_source, package_type, customer_type,
    preferred_time, customer_location, start_city, holiday_destination, visiting_city, start_date, end_date, duration,
    no_of_adults, no_of_children, no_of_infants, no_of_pax, transformation_mode, trans_from_city, trans_to_city,
    hotel_standed, hotel_type, room_sharing_type, room_prefaring, no_of_rooms, meals_plan, food_prefaring,proceesed_by:user_id,
    accomdation_prefaring, meals_prefaring, sight_prefaring, special_includes, do_you_want, your_inputs,lead_status:'I',emi_amount
    ,budget_amount,visa,ticket,honey,day_break,insurance,early,activity,chekcout,guide,dinner,itenary_status:'P'
  };

  if (partner_id && mongoose.Types.ObjectId.isValid(partner_id)) {
    updateData.partner_id = partner_id;
  }
  
  
  
  try {
    const result = await Lead.findByIdAndUpdate(
      lead_id,
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





exports.parmentDelet = async (req, res) => {
  try {
    // Optional: Check if a condition is met before deleting, to ensure this is intentional.
    // For example, you might want to check if the request includes a confirmation flag or specific criteria.
    
    // Perform the delete operation
    const response = await Lead.deleteMany({});

    // Check how many documents were deleted (optional, for feedback purposes)
    if (response.deletedCount > 0) {
      res.status(200).json({ message: `${response.deletedCount} leads were deleted successfully.` });
    } else {
      res.status(200).json({ message: "No leads found to delete." });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};

exports.getUniqueOperationExecutives = async (req, res) => {
  try {
    const uniqueExecutives = await Lead.aggregate([
      {
        $match: {
          "operation_executive": { $exists: true, $ne: null } // Ensure operation_executive exists and is not null
        }
      },
      {
        $lookup: {
          from: "users", // The collection you're referencing in the 'operation_executive' field
          localField: "operation_executive", // Field in Lead model to match with users collection
          foreignField: "_id", // Field in the 'users' collection to match with Lead's 'operation_executive'
          as: "operation_executive_details"
        }
      },
      {
        $unwind: "$operation_executive_details" // Unwind to flatten the operation_executive_details array
      },
      {
        $group: {
          _id: "$operation_executive", // Group by operation_executive _id to get unique executives
          first_name: { $first: "$operation_executive_details.first_name" },
          last_name: { $first: "$operation_executive_details.last_name" }
        }
      },
      {
        $project: {
          executive_name: {
            $concat: [
              { $ifNull: ["$first_name", ""] },
              " ",
              { $ifNull: ["$last_name", ""] }
            ]
          },
          executive_id: "$_id", // Keep the executive's id
          _id: 0 // Hide the _id field
        }
      }
    ]);

    if (uniqueExecutives.length === 0) {
      return res.status(404).json({
        message: "No unique operation executives found",
        data: []
      });
    }

    res.status(200).json({
      message: "Unique operation executives fetched successfully",
      data: uniqueExecutives
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred while fetching unique operation executives",
      error: err.message
    });
  }
};






exports.gettotaldaywisecount = async (req, res) => {
  try {
    const counts = await Lead.aggregate([
      {
        $match: {
          operation_executive: { $ne: null }
        }
      },
      {
        $group: {
          _id: '$operation_executive',
          total_leads: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      message: 'Lead counts fetched successfully',
      data: counts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead counts', error: error.message });
  }
};

exports.getpretotaldaywisecount = async (req, res) => {
  try {
    const counts = await Lead.aggregate([
      {
        $match: {
          my_operation_executive: { $ne: null }
        }
      },
      {
        $group: {
          _id: '$my_operation_executive',
          total_leads: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      message: 'Lead counts fetched successfully',
      data: counts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead counts', error: error.message });
  }
};


exports.getLeadSoucceslist = async (req, res) => {
  try {
    const counts = await Lead.aggregate([
      {
        $match: {
          lead_source: { $ne: null }
        }
      },
      {
        $group: {
          _id: '$lead_source',
          total_leads: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      message: 'Lead counts fetched successfully',
      data: counts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead counts', error: error.message });
  }
};

exports.getLeadSourceHolidaySplit = async (req, res) => {
  try {
    const counts = await Lead.aggregate([
      {
        $match: {
          lead_source: { $ne: null },
          holiday_type: { $in: ["Domestic", "International"] }
        }
      },
      {
        $group: {
          _id: {
            lead_source: "$lead_source",
            holiday_type: "$holiday_type"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.lead_source",
          counts: {
            $push: {
              k: "$_id.holiday_type",
              v: "$count"
            }
          }
        }
      },
      {
        $replaceWith: {
          $mergeObjects: [
            { lead_source: "$_id" },
            { $arrayToObject: "$counts" }
          ]
        }
      }
    ]);

    res.status(200).json({
      message: 'Lead counts split by holiday type per lead source',
      data: counts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

exports.pendingDelete=async(req,res)=>{
  const {itenary_status,delete_from}=req.body;
  const {row_id}=req.params;
  try{
      const updatedLead = await Lead.findByIdAndUpdate(
          row_id, // The ID of the lead you want to update
          { itenary_status:itenary_status,delete_from:delete_from }, // The fields you want to update
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

exports.getDeletedItenery = async (req, res) => {
  try {
    const responses = await Lead.find({lead_status:'I',itenary_status:'D'})
  .populate("raised_by", "first_name last_name") // Populating raised_by with first_name and last_name
  .populate("operation_executive", "first_name last_name") // Populating operation_executive with first_name and last_name
  .populate("my_operation_executive", "first_name last_name") // Populating my_operation_executive with first_name and last_name
  .populate("partner_id", "first_name last_name") // Populating partner_id with first_name and last_name
  .populate("executive_changed_by", "first_name last_name") // Populating executive_changed_by with first_name and last_name
  .populate("previous_operation_executive", "first_name last_name");
    res.status(200).json({ message: 'Leads fetched successfully', data: responses });
  } catch (err) {
    // Error handling
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};

exports.allLeads = async (req, res) => {
  try {
    const responses = await Lead.find()
  .populate("raised_by", "first_name last_name") // Populating raised_by with first_name and last_name
  .populate("operation_executive", "first_name last_name") // Populating operation_executive with first_name and last_name
  .populate("my_operation_executive", "first_name last_name") // Populating my_operation_executive with first_name and last_name
  .populate("partner_id", "first_name last_name") // Populating partner_id with first_name and last_name
  .populate("executive_changed_by", "first_name last_name") // Populating executive_changed_by with first_name and last_name
  .populate("previous_operation_executive", "first_name last_name");
    res.status(200).json({ message: 'Leads fetched successfully', data: responses });
  } catch (err) {
    // Error handling
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};


exports.customerinf = async (req, res) => {
  const {customer_name, customer_number, customer_email,no_of_adults,no_of_children, no_of_infants,no_of_pax,holiday_destination,start_date,end_date,duration } = req.body;
  const { row_id } = req.params;
  const updateData = {
    customer_name, customer_number, customer_email,no_of_adults, no_of_children,no_of_infants,no_of_pax,holiday_destination,start_date,end_date,duration   }
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