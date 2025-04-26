const Advancesalary = require("../models/Advancesalary");
const Advanceamount = require('../models/Advanceamount');

exports.addSalary = async (req, res) => {
    const { amount, managers_names } = req.body;
    const  user_id  = req.user.userId;

    // Log the received data
    //console.log("Received managers_names:", managers_names);

    try {
        // Create a new advance salary record
        const newData = new Advancesalary({
            amount,
            managers_names,
            added_by: user_id,
            status: "Pending"
        });

        // Save the new data to the database
        const list = await newData.save();

        // Respond with success message and the saved data
        res.status(200).json({
            message: "success",
            data: list
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Respond with a failure message and status 500
        res.status(500).json({
            message: "failed",
            error: error.message  // Send the error message for debugging
        });
    }
};

exports.getSalarydetails=async(req,res)=>{
    try{
       // const list = await Advancesalary.find().populate('managers_names', 'first_name last_name');

        const list = await Advancesalary.find().populate('added_by', 'first_name').populate('managers_names', 'first_name');

        res.status(200).json({message:"success",data:list});
    }catch(error){
        res.status(500).json({message:"failed"});
    }
}

exports.addingAmounts=async(req,res)=>{
    const {amount,mangersids,added_by,status}=req.body;
    const addedby = req.user.userId;
    try{
    const datas=new Advanceamount({
        amount,
        mangersids,
        added_by:addedby,
        status:'Y'
    });
    const dataSav=await datas.save();
    res.status(200).json({message:'Data saveds',data:dataSav});
    }catch(err){
    res.status(500).json({message:'Data not saveds',err:err.message});
    }
}


exports.getAmounts=async(req,res)=>{
    try {
        const list = await Advanceamount.find()
          .populate('added_by', 'first_name last_name')
          .populate('mangersids', 'first_name last_name'); // populate managerIds (array) with their names
        res.status(200).json({ message: "success", data: list });
      } catch (error) {
        res.status(500).json({ message: "failed", error: error.message });
      }

}


exports.updateAmount=async(req,res)=>{
    const {status}=req.body;
    const { id } = req.params;
    try{
        const updated = await Advanceamount.findByIdAndUpdate(
        id,
        { status },
        { new: true } // This returns the updated document
        );
        if (!updated) {
        return res.status(404).json({ message: "Record not found" });
        }
        res.status(200).json({ message: "Status updated successfully", data: updated });
    }catch(err){
       console.log();
       res.status(500).json({ message: "Failed to update status", error: err.message });
    }
}



exports.deletAmount=async(req,res)=>{
    //const {status}=req.body;
    const { id } = req.params;
    try{
        const updated = await Advanceamount.findByIdAndDelete(id);
        if (!updated) {
        return res.status(404).json({ message: "Record not found" });
        }
        res.status(200).json({ message: "Status updated successfully", data: updated });
    }catch(err){
       console.log();
       res.status(500).json({ message: "Failed to update status", error: err.message });
    }
}