const Inclusion = require("../models/Inclusion");

exports.createInclusions = async (req,res) => {
   const {inc_type,travel_type,standed_type,name} = req.body;
   const {user_id}=req.params;
   try{

    const newData = new Inclusion({
        inc_type,
        travel_type,
        standed_type,
        name,
        added_by:user_id
    });

    const dats = await newData.save();
    if(!dats){
        res.status(200).json({message:"Somthing went wrong.."});
    }
    res.status(200).json({message:"Data Saved Succesfully..",data:newData});
   }catch(error){
    res.status(500).json({message:"unable to strore the data",error});
   }
}

exports.getAll = async(req,res)=>{
    try{
        const list = await Inclusion.find().sort({ created_date: 1 });;
        res.status(500).json({message:"succes",data:list});
    }catch(error){
     res.status(500).json({message:"unble get data"});
    }
}

exports.getSinglerow = async(req,res)=>{
    const {row_id}=req.params;
    try{
        const list = await Inclusion.findOne({ _id:row_id });
       // const list = await Inclusion.findOne({  _id: row_id });

        res.status(500).json({message:"succes",data:list});
    }catch(error){
        res.status(500).json({message:"unble get data"});
    }
}

exports.delete = async(req,res)=>{
   const {row_id}=req.params;
   try{
   const del = await Inclusion.findByIdAndDelete(row_id);
   res.status(200).json({message:"Deleted Successfully"});
   }catch(error){
   res.status(500).json({message:"Saved Successfully",error});
   }
}

exports.updatess = async (req, res) => {
    const { inc_type, travel_type, standed_type, name } = req.body;
    const { row_id } = req.params;
    try {
        // Perform the update using Inclusion model
        const updatedData = await Inclusion.findByIdAndUpdate(
            row_id,  // ID of the document to be updated
            { inc_type, travel_type, standed_type, name },  // Fields to be updated
            { new: true }  // Return the updated document
        );
        // If the document was not found
        if (!updatedData) {
            return res.status(404).json({ message: "Data not found" });
        }
        // Successfully updated the document
        res.status(200).json({ message: "Updated Successfully", data: updatedData });
    } catch (error) {
        // Handle any error that occurs during the update
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
