const Mybank=require('../models/Mybank');

exports.addmyBank=async(req,res)=>{
  const {bank_name,acc_no,nice_name,status}=req.body;
  try{
    const newdata=new Mybank({
        bank_name,acc_no,nice_name,status:'Active'
    });
    const list=await newdata.save();
    res.status(200).json({message:"insert success",data:list});
  }catch(err){
     res.status(500).json({message:"not insert",err:err});
  }
}

exports.getMybank=async(req,res)=>{
   try{
    const list=await Mybank.find({status:'Active'});
    res.status(200).json({message:" success",data:list});
   }catch(err){
    res.status(500).json({message:"not Comming aye",err:err});
   }
}

//const Mybank = require('../models/mybank'); // Adjust the path to your model file

exports.updateMybank = async (req, res) => {
  const { row_id } = req.params;
  try {
    const updatedBank = await Mybank.findByIdAndUpdate(
      row_id,
      { status: 'In-active' },
      { new: true } // This returns the updated document
    );
    if (!updatedBank) {
      return res.status(404).json({ message: 'Bank entry not found' });
    }
    res.status(200).json({ message: 'Status updated to In-active', data: updatedBank });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
};
