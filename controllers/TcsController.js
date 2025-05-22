const Tcs=require('../models/Tcs');

exports.addTcs=async(req,res)=>{
   const {lead_id}=req.params;
   try{

    const tcsNew=new Tcs({
        tcs_per:req.body.tcs_per,
        tcs_amount:req.body.tcs_amount,
        invoice:req.body.invoice,
        adhar:req.body.adhar,
        doc_id:lead_id
    });
    const data=await tcsNew.save();
    res.status(500).json({message:'success',data});
   }catch(err){
     res.status(500).json({message:'error',err:err});
   }

}


exports.getTcs=async(req,res)=>{
 try{
     const list=await Tcs.find();
     res.status(500).json({message:'success',list}); 
 }catch(err){
    res.status(500).json({message:'error'});
 }
}