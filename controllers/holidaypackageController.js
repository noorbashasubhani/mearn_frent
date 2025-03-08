const holidaypackage = require('../models/Holidaypackage');

exports.addPackage=async(req,res)=>{
   const {package_code,package_name,duration,city,destination,cost,added_by}=req.body;
   

   try{
   const newData = new holidaypackage({
    package_code,
    package_name,
    duration,
    city,
    destination,
    cost,
    added_by:user_id
   });
   const datas=await newData.save();
   if(!datas){
    res.status(400).json({message:"error"}); 
   }
   res.status(200).json({message:"success",data:newData}); 
   }catch(err){
    res.status(500).json({message:"error",err});
   }
}


exports.getHoidaysOnly=async(req,res)=>{
const {row_id}=req.params;
try{

    const list = await holidaypackage.find({_id:row_id});
    
       res.status(200).json({message:"success",data:list}); 
}catch(err){
    res.status(500).json({message:"error",err});
}
}

exports.getHoidaysAll=async(req,res)=>{
    try{
        const list = await holidaypackage.find()
        .populate('added_by', 'name') // Populate only the name field from the User model
        .exec();;
        res.status(200).json({message:"success",data:list}); 
    }catch(err){
        res.status(500).json({message:"error",err});
    }
    }