const Comment=require('../models/Comment');
const Lead=require('../models/Lead');
const Team=require('../models/Team');

exports.addComment=async(req,res)=>{

  const {lead_id,message}=req.body;
  const user_id = req.user.userId;
  try{
     const newData=new Comment({
        lead_id,message,added_by:user_id
     });
     const savData=await newData.save();
     res.status(200).json({ message: 'Data Saved', data:savData });
  }catch(err){
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
}


exports.getComment = async (req, res) => {
    const { lead_id } = req.params;
    try {
     // const filter = lead_id ? { lead_id } : {};
      const list = await Comment.find({lead_id:lead_id})
        .sort({ createdAt: -1 })
        .populate("lead_id", "customer_name customer_number lead_status")
        .populate("added_by", "first_name last_name");
  
      res.status(200).json({ message: 'success', data: list });
    } catch (err) {
      res.status(500).json({ message: 'Error occurred', error: err.message });
    }
  };


  exports.getExc = async (req, res) => {
    const { messages } = req.body;
    const user_id = req.user.userId;
    const { lead_id } = req.params;
    let newmsg = '';
    let updatedLead = null;
  
    try {
      // Set message and update lead status if needed
      switch (messages) {
        case 'R':
          newmsg = "Moved to R-N-R Leads";
          updatedLead = await Lead.findByIdAndUpdate(
            lead_id,
            { lead_status: 'R' },
            { new: true }
          );
          break;
        case 'C':
          newmsg = "Moved To Deleted Leads";
          updatedLead = await Lead.findByIdAndUpdate(
            lead_id,
            { lead_status: 'D' },
            { new: true }
          );
          break;
        case 'O':
          newmsg = "Off line working";
          break;
        case 'D':
          newmsg = "Move To Domestic";
          
          const team = await Team.findOne({status:'Y',travel_type:'Domestic'});
          if (!team || !team.team_employees || team.team_employees.length === 0) {
            return res.status(400).json({ message: 'No team members available for assignment' });
          }
          const randomIndex = Math.floor(Math.random() * team.team_employees.length);
          const randomEmployeeId = team.team_employees[randomIndex]._id;

          updatedLead = await Lead.findByIdAndUpdate(
            lead_id,
            {
              holiday_type: 'Domestic',
              operation_executive: randomEmployeeId
            },
            { new: true }
          );

          break;
        case 'I':
          newmsg = "Move To International";

          const teams = await Team.findOne({status:'Y',travel_type:'International'});
          if (!teams || !teams.team_employees || teams.team_employees.length === 0) {
            return res.status(400).json({ message: 'No team members available for assignment' });
          }
          const randomIndext = Math.floor(Math.random() * teams.team_employees.length);
          const randomEmployeeIdt = teams.team_employees[randomIndext]._id;

          updatedLead = await Lead.findByIdAndUpdate(
            lead_id,
            {
              holiday_type: 'International',
              operation_executive: randomEmployeeIdt
            },
            { new: true }
          );
          break;
        default:
          return res.status(400).json({ message: 'Invalid message value' });
      }
  
      // Save comment
      const newComment = new Comment({
        lead_id: lead_id,
        message: newmsg,
        added_by: user_id
      });
  
      const savedComment = await newComment.save();
  
      res.status(200).json({
        message: 'Data Saved',
        comment: savedComment,
        data:updatedLead
      });
    } catch (error) {
      res.status(500).json({ message: 'Error saving comment', error: error.message });
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
          $group: {
            _id: "$operation_executive._id", // Group by operation_executive._id to get unique executives
            first_name: { $first: "$operation_executive.first_name" },
            last_name: { $first: "$operation_executive.last_name" }
          }
        },
        {
          $project: {
            executive_id: "$_id", // Map _id to executive_id
            executive_name: {
              $concat: [
                { $ifNull: ["$first_name", ""] },
                " ",
                { $ifNull: ["$last_name", ""] }
              ]
            },
            _id: 0 // Hide _id field in the final output
          }
        }
      ]);
  
      if (uniqueExecutives.length === 0) {
        return res.status(404).json({
          message: "No operation executives found",
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


  
  