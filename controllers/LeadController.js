const mongoose = require('mongoose');
const Lead = require('../models/Lead');
const Team = require('../models/Team');
const User = require('../models/User'); // Ensure the User model is required if needed

//const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const Cruise = require('../models/Cruise');
const Train = require('../models/Train');
const Bus = require('../models/Buse');

const Supplementary = require('../models/Supplementry'); // corrected spelling

const Transport = require('../models/Transport');
const OnlineHotel = require('../models/Onlinehotel');
const DomesticHotel = require('../models/DomesticHotel');
const Supplier=require('../models/Supplier');
const Visa=require('../models/Visa');

const Tcs=require('../models/Tcs');
const Day=require('../models/Day');
const IncDec=require('../models/FormIncExc');
const Caluculation=require('../models/Caluculation');
//const Package=require('../models/FormPackDetails');
const FormPackDetail=require('../models/FormPackDetail');
const Google=require('../models/Google.js');
const Comment=require('../models/Comment.js');






exports.getTotalAmountsByDocId = async (req, res) => {
  const { doc_id } = req.params;
  const docObjectId = new mongoose.Types.ObjectId(doc_id);


  try {
    const [flightTotal] = await Flight.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_flight_cost" } } }
    ]);

    const [cruiseTotal] = await Cruise.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost" } } }
    ]);

    const [transportTotal] = await Transport.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost" } } }
    ]);

    const [domesticHotelTotal] = await DomesticHotel.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$final_cost" } } }
    ]);

    const [supplementaryTotal] = await Supplementary.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$supp_cost" } } }
    ]);

    const [onlineHotelTotal] = await OnlineHotel.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost" } } }
    ]);

    const [trainTotal] = await Train.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost" } } }
    ]);

    const [busTotal] = await Bus.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_bus_fare" } } }
    ]);

    res.json({
      total_flight_cost: flightTotal?.total || 0,
      total_cruise_cost: cruiseTotal?.total || 0,
      total_train_cost: trainTotal?.total || 0,
      total_bus_cost: busTotal?.total || 0,
      transport_cost: transportTotal?.total || 0,
      online_hotel_cost: onlineHotelTotal?.total || 0,
      domestic_hotel_cost: domesticHotelTotal?.total || 0,
      supplementary_cost: supplementaryTotal?.total || 0,
      total_land:
      (transportTotal?.total || 0) +
      (onlineHotelTotal?.total || 0) +
      (domesticHotelTotal?.total || 0) +
      (supplementaryTotal?.total || 0)
    });

  } catch (err) {
    console.error('Error getting totals:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTotalAmountsByDocIdInt = async (req, res) => {
  const { doc_id } = req.params;
  const docObjectId = new mongoose.Types.ObjectId(doc_id);


  try {
    const [flightTotal] = await Flight.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_flight_cost" } } }
    ]);

    const [cruiseTotal] = await Cruise.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost" } } }
    ]);

    const [transportTotal] = await Transport.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost" } } }
    ]);

    const [domesticHotelTotal] = await DomesticHotel.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$final_cost" } } }
    ]);

    const [supplementaryTotal] = await Supplementary.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$supp_cost" } } }
    ]);

    const [onlineHotelTotal] = await OnlineHotel.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost" } } }
    ]);

    const [trainTotal] = await Train.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost" } } }
    ]);

    const [busTotal] = await Bus.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_bus_fare" } } }
    ]);

     const [SuppTotal] = await Supplier.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost_consider" } } }
    ]);
     const [VisaTotal] = await Visa.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$total_cost" } } }
    ]);
     const [TcsTotal] = await Tcs.aggregate([
      { $match: { doc_id: docObjectId } },
      { $group: { _id: null, total: { $sum: "$tcs_amount" } } }
    ]);

    res.json({
      total_visa_cost: VisaTotal?.total || 0,
      total_tcs_cost: TcsTotal?.total || 0,
      total_flight_cost: flightTotal?.total || 0,
      total_cruise_cost: cruiseTotal?.total || 0,
      total_train_cost: trainTotal?.total || 0,
      total_bus_cost: busTotal?.total || 0,
      transport_cost: transportTotal?.total || 0,
      online_hotel_cost: onlineHotelTotal?.total || 0,
      domestic_hotel_cost: domesticHotelTotal?.total || 0,
      supplementary_cost: supplementaryTotal?.total || 0,
      supplier_total: SuppTotal?.total || 0,
      total_land:
      (SuppTotal?.total || 0) +
      (onlineHotelTotal?.total || 0) +
      (supplementaryTotal?.total || 0)
    });

  } catch (err) {
    console.error('Error getting totals:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



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
    const team = await Team.findOne({ travel_type: holiday_type, status:'Y' }); // Use findOne to fetch a single team
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
    const responses = await Lead.findById(lead_id)
   .populate({
  path: 'holiday_destination',
  select: 'destination_name' // only fetch name and location fields
});
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
    const responses = await Lead.find({
  lead_status: 'I',
  itenary_status: { $in: ['A', 'R', 'P'] }
  })
  .populate("raised_by", "first_name last_name") // Populating raised_by with first_name and last_name
  .populate("operation_executive", "first_name last_name") // Populating operation_executive with first_name and last_name
  .populate("my_operation_executive", "first_name last_name") // Populating my_operation_executive with first_name and last_name
  .populate("partner_id", "first_name last_name") // Populating partner_id with first_name and last_name
  .populate("executive_changed_by", "first_name last_name") // Populating executive_changed_by with first_name and last_name
  .populate("qc_done_by", "first_name last_name")
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


exports.updateAssign = async (req, res) => {
  const { operation_executive, reason, executive } = req.body;
  const { row_id } = req.params;
  const user_id = req.user.userId;

  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      row_id,
      {
        operation_executive,
        reason,
        executive_changed_by: user_id,
        previous_operation_executive: executive,
      },
      { new: true }
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

    res.status(200).json({
      message: 'Leads Assigned successfully',
      data: populatedLead,
    });

  } catch (err) {
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
};



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
    accomdation_prefaring, meals_prefaring, sight_prefaring, special_includes, do_you_want, your_inputs,
    proceesed_by, emi_amount, budget_amount, visa, ticket, honey, day_break, insurance, early, activity, chekcout, guide, dinner
  } = req.body;

  const user_id = req.user.userId;
  const { lead_id } = req.params;

  // ✅ Generate new ghrn_no
  let new_ghrn_no = '';
  try {
    const lastLead = await Lead.findOne({ ghrn_no: { $regex: /^GHRN\d+$/ } })
      .sort({ ghrn_no: -1 }) // Sort descending by ghrn_no
      .lean();

    if (lastLead && lastLead.ghrn_no) {
      const lastNumber = parseInt(lastLead.ghrn_no.replace('GHRN', '')) || 0;
      new_ghrn_no = `GHRN${lastNumber + 1}`;
    } else {
      new_ghrn_no = 'GHRN10001'; // Starting value if none exists
    }
  } catch (err) {
    return res.status(500).json({ message: 'Failed to generate GHRN number', error: err.message });
  }

  const updateData = {
    customer_name, customer_number, customer_email, holiday_type, lead_source, package_type, customer_type,
    preferred_time, customer_location, start_city, holiday_destination, visiting_city, start_date, end_date, duration,
    no_of_adults, no_of_children, no_of_infants, no_of_pax, transformation_mode, trans_from_city, trans_to_city,
    hotel_standed, hotel_type, room_sharing_type, room_prefaring, no_of_rooms, meals_plan, food_prefaring,
    accomdation_prefaring, meals_prefaring, sight_prefaring, special_includes, do_you_want, your_inputs,
    proceesed_by: user_id, emi_amount, budget_amount, visa, ticket, honey, day_break, insurance,
    early, activity, chekcout, guide, dinner,
    lead_status: 'I',
    itenary_status: 'P',
    ghrn_no: new_ghrn_no,
  };

  if (partner_id && mongoose.Types.ObjectId.isValid(partner_id)) {
    updateData.partner_id = partner_id;
  }

  try {
    const result = await Lead.findByIdAndUpdate(
      lead_id,
      updateData,
      { new: true }
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


exports.getQcLeads=async(req,res)=>{
 try{
  const list =await Lead.find({itenary_status:'Q'}).
  populate({path:'operation_executive',select:'first_name last_name'}).
  populate({path:'holiday_destination',select:'destination_name'});
  
    res.status(200).json({message:'success',data:list});

 }catch(err){
    res.status(500).json({message:'Not coming',error:err.message});
 }
}


exports.doApprove=async(req,res)=>{
  const {id}=req.params;
  const {itenary_status,qc_done_by}=req.body;
  try{
  const res = await Lead.findByIdAndUpdate(
  id,
  { itenary_status: itenary_status,qc_done_by:qc_done_by},
  { new: true }
  );
  res.status(200).json({message:'success'});
  }catch(err){
     res.status(500).json({message:'Not coming',error:err.message});
  }
}

exports.doRejects=async(req,res)=>{
  try{
  const res = await Lead.findByIdAndUpdate( req.params.id,{ itenary_status: 'A' },{ new: true });
  res.status(200).json({message:'success'});
  }catch(err){
     res.status(500).json({message:'Not coming',error:err.message});
  }
}

exports.doPublish=async(req,res)=>{
  try{
  const res = await Lead.findByIdAndUpdate( req.params.id,{ itenary_status: 'L' },{ new: true });
  res.status(200).json({message:'success'});
  }catch(err){
     res.status(500).json({message:'Not coming',error:err.message});
  }
}

exports.publisheItinery=async(req,res)=>{
  try{
    const resd = await Lead.find({ itenary_status: 'L' }).
    populate({path:'operation_executive',select:'first_name last_name'}).
    populate({path:'holiday_destination',select:'destination_name'});
    res.status(200).json({message:'success',data:resd});
  }catch(err){
    res.status(500).json({message:'Not coming',error:err.message});
  }
}

exports.getSelectedItinery=async(req,res)=>{
  try{
    const resd = await Lead.find({ghrn_no:req.params.id}).
    populate({path:'operation_executive',select:'first_name last_name'}).
    populate({path:'holiday_destination',select:'destination_name'}).
    populate({path:'qc_done_by',select:'first_name'});
    res.status(200).json({message:'success',data:resd});
  }catch(err){
    res.status(500).json({message:'Not coming',error:err.message});
  }
}



exports.duplicateDoc = async (req, res) => {
  const { doc_id } = req.params;

  try {
    // Step 1: Duplicate the main document
    const originalDoc = await Lead.findById(doc_id);
    if (!originalDoc) return res.status(404).json({ message: 'Document not found' });

    const newDocData = originalDoc.toObject();
    delete newDocData._id;
    delete newDocData.createdAt;
    delete newDocData.updatedAt;

    const duplicatedDoc = await Lead.create(newDocData);
    const newDocId = duplicatedDoc._id;

    // Step 2: Utility to duplicate related documents
    const duplicateRelated = async (Model) => {
      const relatedDocs = await Model.find({ doc_id });
      if (!relatedDocs.length) return;

      const newDocs = relatedDocs.map(doc => {
        const data = doc.toObject();
        delete data._id;
        delete data.createdAt;
        delete data.updatedAt;
        data.doc_id = newDocId;
        return data;
      });

      await Model.insertMany(newDocs);
    };

    // Step 3: Apply to all related collections
    const relatedModels = [
      Flight, Cruise, Train, Bus, Supplementary, Transport,
      OnlineHotel, DomesticHotel, Supplier, Visa,
      Tcs, Day, IncDec, Caluculation, FormPackDetail
    ];

    for (const model of relatedModels) {
      await duplicateRelated(model);
    }

    res.status(201).json({ message: 'Duplicated main & related docs', new_doc_id: newDocId });
  } catch (error) {
    console.error('Duplication error:', error);
    res.status(500).json({ message: 'Duplication failed', error: error.message });
  }
};



exports.doConfirmStatus = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // 👈 You'll pass this from frontend

  try {
    const updated = await Lead.findByIdAndUpdate(
      id,
      {
        itenary_status: 'C',
        confirmed_by: userId,
        confirmed_date: new Date(),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Document not found' });

    res.status(200).json({ message: 'Confirmed successfully', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error confirming itinerary', error: err.message });
  }
};


exports.getAllCofirmedItinery = async (req, res) => {
  try {
    const leads = await Lead.find({ itenary_status: 'C' })
      .populate('operation_executive', 'first_name last_name')
      .populate('holiday_destination', 'destination_name')
      .populate('qc_done_by', 'first_name');
    const leadIds = leads.map(lead => lead._id);
    const calculations = await Caluculation.find({ doc_id: { $in: leadIds } });
    // Match calculation to each lead
    const enrichedLeads = leads.map(lead => {
      const calc = calculations.find(c => c.doc_id.toString() === lead._id.toString());
      return {
        ...lead.toObject(),
        calculation_data: calc || null
      };
    });
    res.status(200).json({ message: 'success', data: enrichedLeads });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};

exports.getAllCancelledItinery = async (req, res) => {
  try {
    const leads = await Lead.find({ itenary_status: 'N' })
      .populate('operation_executive', 'first_name last_name')
      .populate('holiday_destination', 'destination_name')
      .populate('qc_done_by', 'first_name');

    const leadIds = leads.map(lead => lead._id);

    const calculations = await Caluculation.find({ doc_id: { $in: leadIds } });

    // Match calculation to each lead
    const enrichedLeads = leads.map(lead => {
      const calc = calculations.find(c => c.doc_id.toString() === lead._id.toString());
      return {
        ...lead.toObject(),
        calculation_data: calc || null
      };
    });

    res.status(200).json({ message: 'success', data: enrichedLeads });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};

exports.doCancelledStatus = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required for cancellation' });
  }

  try {
    const updated = await Lead.findByIdAndUpdate(
      id,
      {
        itenary_status: 'N',
        cancelled_by: userId,
        cancelled_date: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Itinerary cancelled successfully', data: updated });
  } catch (err) {
    res.status(500).json({
      message: 'Error cancelling itinerary',
      error: err.message,
    });
  }
};



exports.leadwiseReviews = async (req, res) => {
  try {
    const leads = await Lead.find({ itenary_status: 'C' })
      .populate('operation_executive', 'first_name last_name')
      .populate('holiday_destination', 'destination_name')
      .populate('qc_done_by', 'first_name');

    // Get list of lead IDs
    const leadIds = leads.map(lead => lead._id);

    // Get review counts per lead
    const reviews = await Google.aggregate([
      {
        $match: {
          doc_id: { $in: leadIds }
        }
      },
      {
        $group: {
          _id: '$doc_id',
          total: { $sum: 1 },
          approved: {
            $sum: { $cond: [{ $eq: ['$status', 'A'] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ['$status', 'R'] }, 1, 0] }
          }
        }
      }
    ]);

    // Convert to map for fast lookup
    const reviewCountMap = {};
    reviews.forEach(r => {
      reviewCountMap[r._id.toString()] = {
        total: r.total,
        approved: r.approved,
        rejected: r.rejected
      };
    });

    // Attach review count to each lead
    const leadsWithReviewCount = leads.map(lead => {
      const counts = reviewCountMap[lead._id.toString()] || { total: 0, approved: 0, rejected: 0 };
      return {
        ...lead.toObject(),
        review_total: counts.total,
        review_approved: counts.approved,
        review_rejected: counts.rejected
      };
    });

    // ✅ Send response
    res.status(200).json({
      message: "Lead data with review counts",
      data: leadsWithReviewCount
    });

  } catch (err) {
    res.status(500).json({
      message: "Error retrieving leads with review count",
      error: err.message
    });
  }
};


// PATCH /lead/gift-voucher/:id
exports.giveGiftVoucher = async (req, res) => {
  try {
    const leadId = req.params.id;
    const { userId, gift_vocher_given } = req.body;
    const today = new Date();
     const giftDate = new Date(today.setMonth(today.getMonth() + 1));
    const updated = await Lead.findByIdAndUpdate(
      leadId,
      {
        gift_vocher_given: gift_vocher_given,
        gift_vocher_given_date: giftDate,
        gift_vocher_given_by: userId,
      },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update gift voucher info' });
  }
};


// Assuming you have imported Lead model properly above

exports.getGiftVochers = async (req, res) => {
  try {
    const vouchers = await Lead.find({
      itenary_status: 'C',
      gift_vocher_given: 'Y'
    }).populate('holiday_destination'); // Optional: to show destination name

    res.status(200).json({ success: true, data: vouchers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch gift voucher info' });
  }
};



exports.getLeadsCommentsDetails = async (req, res) => {
  try {
    const { year, executiveId } = req.params;
    const yearInt = parseInt(year);

    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${yearInt + 1}-01-01T00:00:00.000Z`);

    // Get leads for this executive and year
    const leads = await Lead.find({
      createdAt: { $gte: startDate, $lt: endDate },
      operation_executive: executiveId
    })
      .populate('holiday_destination', 'destination_name')
      .populate('operation_executive', 'first_name')
      .lean();

    // Get the team to get the team lead
    const team = await Team.findOne({
      team_employees: executiveId
    }).populate('dept_lead', 'first_name last_name');

    const teamLeadName = team?.dept_lead
      ? `${team.dept_lead.first_name} ${team.dept_lead.last_name || ''}`.trim()
      : null;

    // Attach all comments per lead
    const leadsWithComments = await Promise.all(
      leads.map(async (leads) => {
        const comments = await Comment.find({ lead_id: leads._id })
          .sort({ createdAt: -1 }) // Optional: newest comment first
          .lean();

        return {
          ...leads,
          team_lead_name: teamLeadName,
          comments
        };
      })
    );

    res.status(200).json({
      success: true,
      message: 'Leads with team lead and comments fetched',
      data: leadsWithComments
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch data',
      error: err.message
    });
  }
};


