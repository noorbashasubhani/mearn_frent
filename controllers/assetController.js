const Asset = require("../models/Asset");

exports.addAssets = async(req,res)=>{
const {stock_name}=req.body;
const user_id=req.user.userId;
    try{
        const newDate = new Asset({
            stock_name,
            added_by:user_id
        })
        const data=await newDate.save();
        res.status(200).json({message:"success",date:newDate});
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