const Cruise=require('../models/Cruise');

exports.addCruise=async(req,res)=>{
   const {lead_id}=req.params;
   try{

    const cruiseNew=new Cruise({
        cruise_supp:req.body.cruise_supp,
        cruise_name:req.body.cruise_name,
        contact_person:req.body.contact_person,
        contact_number:req.body.contact_number,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        start_city:req.body.start_city,
        end_city:req.body.end_city,
        cabin_type:req.body.cabin_type,
        meal_plan:req.body.meal_plan,
        no_of_ninghts:req.body.no_of_ninghts,
        no_of_adults:req.body.no_of_adults,
        no_of_children:req.body.no_of_children,
        no_of_cabin:req.body.no_of_cabin,
        total_cost:req.body.total_cost,
        selling_cities: req.body.selling_cities, 
        doc_id:lead_id
    });
       
    const data=await cruiseNew.save();

     res.status(500).json({message:'success',data});
   }catch(err){
     res.status(500).json({message:'error'});
   }

}


exports.getCruise=async(req,res)=>{
 try{
     const list=await Cruise.find().
     populate({path: 'selling_cities',select: 'destination_name'});
     res.status(200).json({message:'success',list}); 
 }catch(err){
    res.status(500).json({message:'error'});
 }
}

exports.getCruisesel=async(req,res)=>{
 try{
     const list=await Cruise.find({doc_id:req.params.id}).
     populate({path: 'selling_cities',select: 'destination_name'});
     res.status(200).json({message:'success',list}); 
 }catch(err){
    res.status(500).json({message:'error'});
 }
}



exports.delCruise=async(req,res)=>{
  const {row_id}=req.params;
  try{
     const delres=await Cruise.findByIdAndDelete(row_id);
     res.status(200).json({message:'success'}); 
  }catch(err){
     res.status(500).json({message:'error'});
  }
}

exports.updateCruise=async(req,res)=>{
  const {row_id}=req.params;
  const formData=req.body;
  try{
    const updatCrs=await Cruise.findByIdAndUpdate(row_id,formData,{new:true});
   res.status(200).json({message:'success'}); 
  }catch(err){
   res.status(500).json({message:'error'});
  }
}