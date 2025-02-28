const Notification = require("../models/Notification");

exports.AddNotification = async (req, res) => {
    const { from_id, to_id, message_heading, message_body, status } = req.body;
    try {
        // Corrected object creation
        const newData = new Notification({
            from_id,
            to_id,
            message_heading,
            message_body,
            status: 'Y', // Default status value
            message_read: 'N' // Default message_read value
        });

        // Save the new notification
        const list = await newData.save();
        res.status(200).json({ message: "success", data: list });
    } catch (error) {
        res.status(500).json({ message: "failed", error });
    }
};

exports.NotificationList=async(req,res)=>{

try{
    const list =await Notification.find();
    res.status(200).json({message:"success",data:list});
}catch(error){
    res.status(500).json({message:"failed",error});
}

}


exports.getSinleNotification = async (req,res) => {
   const {row_id}=req.params;
   const list=await Notification.findOne({_id:row_id});
   try{
    res.status(200).json({message:"success",data:list});
   }catch(error){
     res.status(500).json({message:"faile",error});
   }
}