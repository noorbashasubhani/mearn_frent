const Otherexc = require("../models/Otherexc");

exports.addOtherflow = async (req,res) => {
  const {name} = req.body;
  const {user_id} = req.params;
  
  try{
   const newData = new Otherexc ({
    name,
    status:'Y'
   })
   const infs = await newData.save();
   if(! infs){
    res.status(500).json({message:"Data not saved"});
   }
    res.status(200).json({message:"success",data:newData});
  } catch(error){
    res.status(500).json({message:"Failed",error});
  }
};

exports.getAllOtherflows = async(req,res) => {
  try{
    const list = await Otherexc.find();
    res.status(200).json({message:"success",data:list});
  }catch(error){
    res.status(500).json({message:"Failed",error});
  }
};

exports.getSingleOtherflow = async(req,res)=>{
const { row_id }=req.params;
  try{
    const list = await Otherexc.findById({_id:row_id});
    if(!list){
      res.status(400).json({message:"Data not came"});
    }
    res.status(200).json({message:"success",data:list});
  }catch(error){
   res.status(500).json({message:"Data failed"});
  }
};


exports.deleteOtherflow = async (req, res) => {
  const { row_id } = req.params; // Get row_id from the request parameters
  try {
    // Attempt to find and delete the document by its ID
    const dd = await Otherexc.findByIdAndDelete(row_id);
    // If no document was found, return a 404 error
    if (!dd) {
      return res.status(404).json({ message: "Data not found, deletion failed" });
    }
    // Successfully deleted
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the operation
    return res.status(500).json({ message: "Failed to delete data", error: error.message });
  }
};


exports.updateOtherflow = async (req, res) => {
  const { row_id } = req.params;  // Get row_id from the request parameters
  const { name } = req.body;  // Get updated name from the request body

  try {
    // Find and update the document by its ID, and return the updated document
    const updateFlow = await Otherexc.findByIdAndUpdate(
      row_id,
      { name },
      { new: true }  // Return the updated document
    );

    // If no document was found to update
    if (!updateFlow) {
      return res.status(404).json({ message: "Data not updated. Document not found." });
    }

    // If update is successful, return the updated document
    return res.status(200).json({ message: "Data updated successfully", data: updateFlow });

  } catch (error) {
    // Handle any errors during the update process
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

