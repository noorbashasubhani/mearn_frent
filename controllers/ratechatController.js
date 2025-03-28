const Ratechat = require('../models/Ratechat');


exports.addRatechat=async(req,res)=>{
    const {city_name,hotel_name,expire_date}=req.body;
    try{
        const newData=new Ratechat({
            city_name,
            hotel_name,
            expire_date
        });

        const dataSave = await newData.save();
        if(!dataSave){
            res.status(400).json({message:'sommegint went wrong nto save'});
        }
        res.status(200).json({message:"Data saved successfuly.....",data:newData});

    }catch(err){
        res.status(500).json({message:'sommegint',err});
    }
}


exports.getsRates=async(req,res)=>{
  try{
      const list = await Ratechat.find();
      res.status(200).json({message:"Success",data:list});
  }catch(err){
      res.status(400).json({message:"error",err});
  }
}

exports.deletRates=async(req,res)=>{
  const {row_id}=req.params;
  try{
    const delRow = await Ratechat.findByIdAndDelete(row_id);
    res.status(200).json({message:"Row Deleted Success"});
  }catch(err){
    res.status(400).json({message:"erro",err});
  }
}


exports.editRatechat=async(req,res)=>{
  const {city_name,hotel_name,expire_date}=req.body;
  const {row_id}=req.params;
  try{
      
      const dataSave = await Ratechat.findByIdAndUpdate(row_id,{city_name,hotel_name,expire_date},{new:true});
      if(!dataSave){
          res.status(400).json({message:'sommegint went wrong nto save'});
      }
      res.status(200).json({message:"Data updated successfuly.....",data:dataSave});

  }catch(err){
      res.status(500).json({message:'sommegint',err});
  }
}
