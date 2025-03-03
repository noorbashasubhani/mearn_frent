const Dcreditnote = require("../models/Dcreditnote");

exports.AddDomesticCredit = async (req, res) => {
  const { city_name, service_type, hotel_name, valid_date, ref_no, amount } = req.body;
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
      user_id, // Save the userId that was decoded from the token
    });
    // Save the new credit note to the database
    await newCreditNote.save();
    // Return a success response
    res.status(200).json({ message: "Domestic credit note added successfully." });
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