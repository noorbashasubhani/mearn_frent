const Complaints = require("../models/Complaint");

exports.addComplaints = async (req, res) => {
   const { annonymus, manger_id, escalation_regarding, concern_specific, regard_any_request, other_reason, concern } = req.body;
   const { user_id } = req.params;

   try {
      const newData = new Complaints({
          annonymus,
          manger_id,
          escalation_regarding,
          concern_specific,
          regard_any_request,
          other_reason,
          concern,
          added_by: user_id // user_id is passed from the URL
      });

      await newData.save();

      res.status(200).json({ message: "Data Added successfully", data: newData });
   } catch (error) {
      res.status(500).json({ message: "Something went wrong to submit data", error });
   }
};

exports.allComplaints = async (req,res) =>{
   try{

    const list = await Complaints.find();
    res.status(200).json({message:"succces",data:list});

   }catch(error){
    res.status(200).json({message:"Unable to fetch Data form data base",error});
   }
}

exports.singleComplaints = async (req, res) => {
  const { row_id } = req.params;
  try {
      // Search for the complaint by _id
      const singlist = await Complaints.findOne({ _id: row_id });
      // If no complaint is found
      if (!singlist) {
          return res.status(404).json({ message: "Complaint not found" });
      }
      // If the complaint is found, send it back with a success message
      res.status(200).json({ message: "Success", data: singlist });
  } catch (error) {
      // In case of any errors during the process
      res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

exports.delete = async(req,res)=>{
  const { row_id }=req.params;
  try{
   const deletdata = await Complaints.findByIdAndDelete(row_id);
   if(!deletdata){
    res.status(200).json({message:"Unable Deleted.."});
   }
    res.status(200).json({message:"Data Deleted Successfully.."});
  }catch(error){
    res.status(500).json({message:"Unable To delete",error});
  }
}

exports.update = async (req, res) => {
  const { row_id } = req.params; // Extract the row_id (complaint's _id) from the request parameters
  const { annonymus, manger_id, escalation_regarding, concern_specific, regard_any_request, other_reason, concern } = req.body;  // Extract fields to be updated from the body
  
  try {
      // Find and update the complaint by its _id
      const updatedComplaint = await Complaints.findByIdAndUpdate(
          row_id,  // _id of the complaint to update
          { 
              annonymus, 
              manger_id, 
              escalation_regarding, 
              concern_specific, 
              regard_any_request, 
              other_reason, 
              concern 
          },
          { new: true }  // Return the updated document
      );

      // If the complaint with row_id doesn't exist
      if (!updatedComplaint) {
          return res.status(404).json({ message: "Complaint not found" });
      }

      // Return the updated complaint
      res.status(200).json({ message: "Complaint updated successfully", data: updatedComplaint });

  } catch (error) {
      // Return a server error message if anything goes wrong
      res.status(500).json({ message: "Unable to update complaint", error: error.message });
  }
};
