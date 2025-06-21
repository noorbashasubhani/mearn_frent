const DaySS=require('../models/Day');
const mongoose=require('mongoose');


exports.addDay = async (req, res) => {
  const { lead_id } = req.params;
  try {
    const newDay = new DaySS({
      ...req.body,
      doc_id: lead_id
    });
    const savedDay = await newDay.save();
    //await savedDay.populate('hotel_id'); // ✅ Populate the hotel details
    res.status(200).json({
      message: "Day created successfully",
      day: savedDay
    });
    
  } catch (err) {
    res.status(500).json({
      message: "Failed to create day",
      error: err.message
    });
  }
};


exports.getDauys=async(req,res)=>{
      try{
        const list=await DaySS.find().populate({path:'hotel_id',select:'hotel_name'});
         res.status(200).json({ message: "Day created successfully", list});
      }catch(err){
        res.status(500).json({ message: "Failed to create day", error: err.message });
      }
}
exports.getDauysel=async(req,res)=>{
      try{
        const list=await DaySS.find({doc_id:req.params.id}).populate({path:'hotel_id',select:'hotel_name'});
         res.status(200).json({ message: "Day created successfully", data:list});
      }catch(err){
        res.status(500).json({ message: "Failed to create day", error: err.message });
      }
}

exports.delDay=async(req,res)=>{
     const {row_id}=req.params;
     try{
       const delData=await DaySS.findByIdAndDelete(row_id);
       if(!delData){
        res.status(400).json({ message: "Day created successfully", list});
       }
       res.status(200).json({ message: "Day Not Deleted successfully"});
     }catch(err){
       res.status(500).json({ message: "Failed to create day", error: err.message });
     }
}

exports.updateDay=async(req,res)=>{
  const {row_id}=req.params;
  const newData=req.body;
  try{
    const updates=await DaySS.findByIdAndUpdate(row_id,newData,{new:true});
    if(!updates){
      res.status(400).json({ message: "Not successfully"});
    }
    res.status(200).json({ message: " successfully"});
  }catch(err){
    res.status(500).json({ message: "Failed to create day", error: err.message });
  }
}