const Companybank = require("../models/Companybank");

exports.createBank = async (req,res) => {
  const {bank_name,bank_acc,nick_name}=req.body;
  try{
   const newData=new Companybank({
    bank_name,bank_acc,nick_name
   });
   const added_data=newData.save();
   res.status(200).json({message:"success",data:newData});
  }catch(error){
   res.status(500).json({message:"erro",error});
  }

}


exports.getcompBank = async (req,res) => {
    try{
      const list = await Companybank.find();
      res.status(500).json({message:"Success",data:list});

    }catch(error){
      res.status(200).json({message:"failed",error});
    }
}

exports.getSingleComBank = async(req,res) =>{
  const { row_id }=req.params;
  try{
  const list = await Companybank.findOne({ _id: row_id });
  if (!list) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({message:"Success",data:list});
  }catch(erro){
  res.status(500).json({message:"failed",error});
  }
}

exports.deleteComBank = async(req,res)=>{
  const { row_id } = req.params;
  try{
    const del = await Companybank.findByIdAndDelete(row_id);
    if(!del){
    res.status(400).json({message:"Unable to Delete"});
   }
    res.status(200).json({message:"success"});
  }catch(error){
    res.status(500).json({message:"failed",error});
  }
}

exports.updateComBank = async (req, res) => {
  const { bank_name, bank_acc, nick_name } = req.body; // Get updated values from the request body
  const { row_id } = req.params; // Get the row_id from the request parameters

  try {
    // Attempt to update the document
    const updates = await Companybank.findByIdAndUpdate(
      row_id,
      { bank_name, bank_acc, nick_name },
      { new: true } // Ensure the updated document is returned
    );

    // If the document was not found or not updated, return a 400 error
    if (!updates) {
      return res.status(404).json({ message: "Document not found or failed to update" });
    }

    // Return the updated document on success
    return res.status(200).json({ message: "Successfully updated", data: updates });

  } catch (error) {
    // Handle any potential errors
    return res.status(500).json({ message: "Failed to update", error: error.message });
  }
};
