const Supplementry=require('../models/Supplementry');

exports.addSupp=async(req,res)=>{
    const {lead_id}=req.params;
    try{
        const newSupp=new Supplementry({
            location:req.body.location,
            provison_date:req.body.provison_date,
            supp_name:req.body.supp_name,
            supp_cost:req.body.supp_cost,
            doc_id:lead_id
        });
        const data=await newSupp.save();
    res.status(200).json({message:"success",data});
    }catch(err){
    res.status(500).json({message:"err"});
    }
}

exports.getSuppl=async(req,res)=>{
   try{
    const data=await Supplementry.find();
    res.status(200).json({message:"success",data});
   }catch(err){
    res.status(500).json({message:"err"});  
   }
}