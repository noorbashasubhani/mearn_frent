const Transport=require('../models/Transport');


exports.addTransport=async(req,res)=>{
     const {lead_id}=req.params;
     try{
        const newTrans=new Transport({
            ...req.body,
            doc_id:lead_id
        });
        const list=await newTrans.save();
     res.status(200).json({message:"success",list});
     }catch(err){
       res.status(500).json({message:"erorr",err:err});
     }
}

exports.getTransport=async(req,res)=>{
    try{
        const list=await Transport.find();
     res.status(200).json({message:"success",list});
    }catch(err){
      res.status(500).json({message:"erorr",err:err});  
    }
}

exports.getTransportsel=async(req,res)=>{
    try{
        const list=await Transport.find({doc_id:req.params.id});
        res.status(200).json({message:"success",data:list});
    }catch(err){
        res.status(500).json({message:"erorr",err:err});  
    }
}


exports.delTransport=async(req,res)=>{
  const {row_id}=req.params;
   try{
    const delData=await Transport.findByIdAndDelete(row_id);
   res.status(200).json({message:"success",list});
   }catch(err){
    res.status(500).json({message:"erorr",err:err});  
   }
}


exports.updateTrans=async(req,res)=>{
  const {row_id}=req.params;
  const formData=req.body;
  try{
    const updatNow=await Transport.findByIdAndUpdate(row_id,formData,{new:true});
     if (!updatNow) {
      return res.status(404).json({ message: "Transport not found" });
    }
    res.status(200).json({message:"success",list:updatNow});
  }catch(err){
    res.status(500).json({message:"erorr",err:err});
  }
}