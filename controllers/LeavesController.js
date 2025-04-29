const Leaves=require('../models/Leave');

exports.addLeave=async(req,res)=>{
   const {from_date,to_date,no_of_days,leave_type,reason,to_manger}=req.body;
   const  user_id  = req.user.userId;
   try{
    const newData=new Leaves({
        from_date,to_date,no_of_days,leave_type,reason,to_manger,added_by:user_id,status:'Pending'
    });
    const savedLeave = await newData.save();
    res.status(200).json({message:"success",data:savedLeave});
   }catch(err){
        res.status(500).json({message:"error",error:err.message});
   }
}


exports.getLeaves = async (req, res) => {
    //const { user_id } = req.params;
  
    try {
      const list = await Leaves.find()
      .populate('to_manger', 'first_name') 
      .populate('added_by', 'first_name');
  
      res.status(200).json({ message: "success", data: list });
    } catch (err) {
      res.status(500).json({ message: "error", error: err.message });
    }
  };


  exports.getSingle = async (req, res) => {
    const { row_id } = req.params;
    try {
      const list = await Leaves.find({_id:row_id
      })
      .populate('to_manger', 'first_name') 
      .populate('added_by', 'first_name');
      res.status(200).json({ message: "success", data: list });
    } catch (err) {
      res.status(500).json({ message: "error", error: err.message });
    }
  };