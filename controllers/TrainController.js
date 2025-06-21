const Train=require('../models/Train');

exports.addTrain = async (req, res) => {
  const { row_id } = req.params;

  try {
    const newTrainData = new Train({
      fare_source: req.body.fare_source,
      train_name: req.body.train_name,
      train_number: req.body.train_number,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      start_city: req.body.start_city,
      end_city: req.body.end_city,
      duration: req.body.duration,
      class_name: req.body.class_name,
      site_available: req.body.site_available,
      cost: req.body.cost,
      loading: req.body.loading,
      total_cost: req.body.total_cost,
      doc_id: row_id
    });

    const savedTrain = await newTrainData.save();

    res.status(200).json({
      message: 'Data added successfully.',
      list: savedTrain
    });
  } catch (err) {
    res.status(500).json({
      message: 'Data not added, something went wrong.',
      error: err.message
    });
  }
};

exports.getTrainDetails=async(req,res)=>{
    try{
    const list=await Train.find().populate({ path: 'doc_id', select: 'customer_name customer_number' });    
    res.status(200).json({message:"data added successfully..",list});
    }catch(err){
    res.status(500).json({message:"something went wrong"});
    }
}


exports.getTrainDetailselected=async(req,res)=>{
    try{
    const list=await Train.find({doc_id:req.params.id}).populate({ path: 'doc_id', select: 'customer_name customer_number' });    
    res.status(200).json({message:"data added successfully..",list});
    }catch(err){
    res.status(500).json({message:"something went wrong"});
    }
}

exports.deleteTrain=async(req,res)=>{
    const {row_id}=req.params;
    try{
        const datalist=await Train.findByIdAndDelete({_id:row_id});
      res.status(200).json({message:'Data Deleted'});
    }catch(err){
      res.status(500).json({message:'Data not inserted'});
    }
}

exports.editTrain=async(req,res)=>{
 const {row_id}=req.params;
 try{
     const updateDetails=await Train.findByIdAndUpdate(row_id,req.body,{new:true});
     if (!updateDetails) {
      return res.status(404).json({ message: 'Train not found' });
    }
     res.status(200).json({
      message: 'Data updated successfully.',
      list: updateDetails,
    });
 }catch(err){
     res.status(500).json({message:'error',err:err});
 }
}