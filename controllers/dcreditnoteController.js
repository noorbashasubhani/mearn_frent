const Dcreditnote = require("../models/Dcreditnote");
const DomesticCredits=require('../models/DomesticCredit');

exports.AddDomesticCredit = async (req, res) => {
  const { city_name, service_type, hotel_name, valid_date, ref_no, amount,issue_date } = req.body;
  const user_id = req.user.userId;  // userId decoded from the token
  //console.log(req.user);
  try {
    // Create a new domestic credit note
    const newCreditNote = new Dcreditnote({
      city_name,
      service_type,
      hotel_name,
      valid_date,
      ref_no,
      amount,
      issue_date,
      added_by:user_id, // Save the userId that was decoded from the token
    });
    // Save the new credit note to the database
   const data= await newCreditNote.save();
    // Return a success response
    res.status(200).json({ message: "Domestic credit note added successfully.",data:data });


  } catch (error) {
    console.error("Error adding domestic credit note:", error);
    res.status(500).json({ message: "Something went wrong, please try again." });
  }
};


exports.getDomesticCredits = async(req,res)=>{
  try{
    const list = await Dcreditnote.find();
    res.status(200).json({message:"succes",data:list});
  }catch(error){
    res.status(500).json({message:"failed",error});
  }
}

exports.deleteDomCredits=async(req,res)=>{
   const {row_id}=req.params;
   try{
    const data=await Dcreditnote.findByIdAndDelete(row_id);
    res.status(200).json({message:"Deleted Successfully.."});
   }catch(err){
    res.status(500).json({message:"error comitn"});
   }
}



exports.addDomestiCredits=async(req,res)=>{
  console.log("Received body:", req.body);
try {
    const newCredit = await DomesticCredits.create(req.body);
    res.status(200).json({ message: 'Credit added', data: newCredit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getCredits = async(req,res)=>{
  try{
    const list = await DomesticCredits.find();
    res.status(200).json({message:"succes",data:list});
  }catch(error){
    res.status(500).json({message:"failed",error});
  }
}

exports.updateDomesticCredit = async (req, res) => {
  try {
    const { id } = req.params;

    const updateFields = {
      city: req.body.city,
      serviceType: req.body.serviceType,
      supplierName: req.body.supplierName,
      cnIssuedDate: req.body.cnIssuedDate,
      validTill: req.body.validTill,
      refNumber: req.body.refNumber,
      currency_rate:req.body.currency_rate
      // Do NOT update amount
    };

    const updated = await DomesticCredits.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Credit not found' });
    }

    res.status(200).json({ message: 'Credit updated', data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};