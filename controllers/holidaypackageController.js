const holidaypackage = require('../models/Holidaypackage');

exports.addPackage=async(req,res)=>{
   const {package_code,package_name,duration,city,destination,cost}=req.body;
   const {user_id}=req.params;

   try{
   const newData = new holidaypackage({
    package_code,
    package_name,
    duration,
    city,
    destination,
    cost,
    added_by:user_id
   });
   const datas=await newData.save();
   if(!datas){
    res.status(400).json({message:"error"}); 
   }
   res.status(200).json({message:"success",data:newData}); 
   }catch(err){
    res.status(500).json({message:"error",err});
   }
}


exports.getHoidaysOnly=async(req,res)=>{
const {row_id}=req.params;
try{

    const list = await holidaypackage.find({_id:row_id});
    
       res.status(200).json({message:"success",data:list}); 
}catch(err){
    res.status(500).json({message:"error",err});
}
}

exports.getHoidaysAll=async(req,res)=>{
    try{
        const list = await holidaypackage.find()
        .populate('added_by', 'name') // Populate only the name field from the User model
        .exec();;
        res.status(200).json({message:"success",data:list}); 
    }catch(err){
        res.status(500).json({message:"error",err});
    }
    }

    exports.deletePack=async(req,res)=>{
      const {row_id}=req.params;
      try{
        const deldata=await holidaypackage.findByIdAndDelete(row_id);
        res.status(200).json({message:"success"});
      }catch(error){
        res.status(500).json({message:"error",error});
      }
    }

    
    exports.updatePack = async (req, res) => {
      const { package_code, package_name, duration, city, destination, cost } = req.body;
      const { row_id } = req.params;
    
      try {
        // Find the package by ID and update it with the new data
        const updatedPackage = await holidaypackage.findByIdAndUpdate(
          row_id,
          {
            package_code,
            package_name,
            duration,
            city,
            destination,
            cost,
          },
          { new: true } // This option ensures the updated document is returned
        );
    
        // If no package is found, return 404
        if (!updatedPackage) {
          return res.status(404).json({ message: 'Package not found' });
        }
    
        // Send a success response with the updated package
        res.status(200).json({
          message: 'Package updated successfully',
          data: updatedPackage,
        });
      } catch (error) {
        // Handle any errors that may occur
        console.error(error);
        res.status(500).json({ message: 'Error updating package', error });
      }
    };
    