const Visa=require('../models/Visa');

exports.addVisa=async(req,res)=>{
   const {lead_id}=req.params;
   try{

    const visaNew=new Visa({
        nationality:req.body.nationality,
        cost_per_person:req.body.cost_per_person,
        no_of_pax:req.body.no_of_pax,
        total_cost:req.body.total_cost,
        doc_id:lead_id
    });
    const data=await visaNew.save();
    res.status(500).json({message:'success',data});
   }catch(err){
     res.status(500).json({message:'error'});
   }

}


exports.getVisa=async(req,res)=>{
 try{
     const list=await Visa.find();
     res.status(500).json({message:'success',list}); 
 }catch(err){
    res.status(500).json({message:'error'});
 }
}