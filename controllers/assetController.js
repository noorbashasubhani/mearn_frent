const Asset = require("../models/Asset");

exports.addAssets = async(req,res)=>{
const {stock_name}=req.body;

    try{
        const newDate = new Asset({
            stock_name
        })
        const data=await newDate.save();
        res.status(200).json({message:"success",data:newDate});
    }catch(error){
        res.status(500).json({message:"error",error});
    }
}

exports.getAssets = async(req,res)=>{
   try{
     const list = await Asset.find();
     res.status(200).json({message:"Assets Detaiils",data:list});
   }catch(error){
     res.status(500).json({message:"faiiled",error});
   }
}


exports.delAss=async(req,res)=>{
   const {row_id}=req.params;
   try{
    const deldata=await Asset.findByIdAndDelete(row_id);
    if(!deldata){
      res.status(400).json({message:'data something wetn weriong'}); 
    }
    res.status(200).json({message:'data deleted'});
   }catch(err){
        res.status(500).json({message:'data not deleted',err});
   }
}


exports.updateAssets=async(req,res)=>{
 const {row_id}=req.params;
 const {stock_name}=req.body;
  try{
    const list = await Asset.findByIdAndUpdate(row_id,{stock_name},{new:true});
    res.status(200).json({message:'Data updated',data:list});
  }catch(err){
    res.status(500).json({message:'Data not updated',err});
  }
}