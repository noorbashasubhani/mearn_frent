const Recovery = require("../models/Recovery");

exports.addRecovery = async(req,res)=>{
    const {recovery_name,service_type,total_amount,paid_amount,pending_amount}=req.body;
    const user_id = req.user.userId;
    try{
        const newData = new Recovery({
            recovery_name,
            service_type,
            total_amount,
            paid_amount,
            pending_amount,
            added_by:user_id
        });
        await newData.save();
        res.status(200).json({message:"succes"});
    }catch(error){
        res.status(500).json({message:"failed",error});
    }
}

exports.getRecovery = async(req,res)=>{
    try{
       const list = await Recovery.find().populate("added_by","first_name");
       res.status(200).json({message:"getng data successfully..",data:list});
    }catch(error){
        res.status(500).json({message:"failed",error});
    }
}


exports.updateRecovery = async (req, res) => {
    const { recovery_name, service_type, total_amount, paid_amount, pending_amount } = req.body;
    const { row_id } = req.params;
  
    try {
      // Construct the update object without the '_id' field
      const newData = {
        recovery_name,
        service_type,
        total_amount,
        paid_amount,
        pending_amount
      };
  
      // Perform the update
      const updatedRecovery = await Recovery.findByIdAndUpdate(row_id, newData, { new: true });
  
      // If no document was found to update
      if (!updatedRecovery) {
        return res.status(404).json({ message: "Recovery record not found." });
      }
  
      // Send the updated recovery data
      res.status(200).json({
        message: "Success",
        data: updatedRecovery
      });
    } catch (error) {
      // Log the error and send a response with failure details
      console.error("Error updating recovery:", error);
      res.status(500).json({ message: "Failed to update recovery record.", error });
    }
  };
  