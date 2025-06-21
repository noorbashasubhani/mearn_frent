const Bank = require("../models/Bank");





exports.getBank = async (req,res) =>{
  try{
   const list = await Bank.find(); 
   res.status(200).json({ message: "success", data: list });
  }catch(error){
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}



exports.updateBank = async (req, res) => {
   const { bank_name, bank_branc, bank_acc, bank_ifsc_code } = req.body;
   const { id } = req.params;

   try {
     const newData = { bank_name, bank_branc, bank_acc, bank_ifsc_code };

     // Using the correct Mongoose method findByIdAndUpdate
     const updatedBank = await Bank.findByIdAndUpdate(id, newData, { new: true });

     if (!updatedBank) {
       return res.status(404).json({ message: "Bank not found" });
     }

     res.status(200).json({ message: "Bank Details Updated Successfully" });
   } catch (error) {
     res.status(500).json({ message: "Something went wrong", error: error.message });
   }
};


exports.getBankSingle = async (req,res) =>{
  const { id } = req.params;
    try{
        const list = await Bank.findOne({ _id: id });

     res.status(200).json(list);
    }catch(error){
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  }

  exports.getUserBank = async (req,res) =>{
    const { user_id } = req.params;
      try{
          const list = await Bank.findOne({ user_id: user_id });
  
       res.status(200).json(list);
      }catch(error){
        res.status(500).json({ message: "Something went wrong", error: error.message });
      }
    }