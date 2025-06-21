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
    res.status(500).json({message:"err",err:err});
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

exports.getSupplsel=async(req,res)=>{
   try{
    const data=await Supplementry.find({doc_id:req.params.id});
    res.status(200).json({message:"success",data:data});
   }catch(err){
    res.status(500).json({message:"err"});  
   }
}

exports.delSupp=async(req,res)=>{
    const {row_id}=req.params;
    try{
       // const res=await Supplementry.findByIdAndDelete({_id:row_id});
        const deletedDoc = await Supplementry.findByIdAndDelete(row_id);
        res.status(200).json({message:"success"});
    }catch(err){
        res.status(500).json({message:"err"}); 
    }
}


exports.updateSup=async(req,res)=>{
 const {row_id}=req.params;
 const updatedData = req.body;
 try{
   const updateSupp=await Supplementry.findByIdAndUpdate(row_id,updatedData,{new:true});
   res.status(200).json({ message: 'Update successful', data: updateSupp });
 }catch(err){
    res.status(500).json({message:"err"}); 
 }
}
