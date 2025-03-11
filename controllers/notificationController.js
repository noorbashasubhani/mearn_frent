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

exports.delNotificaton=async(req,res)=>{
    const {row_id}=req.params;
    try{
        const list=await Notification.findByIdAndDelete(row_id);
        res.status(200).json({message:"success"});
    }catch(error){
        res.status(500).json({message:"faile",error});
    }
}



exports.readStatus = async (req, res) => {
    const { row_id } = req.params;
    
    try {
      // Update the message_read field to 'Y' (indicating "Read")
      const updatedNotification = await Notification.findByIdAndUpdate(
        row_id,
        { message_read: 'Y' },  // Update message_read to 'Y'
        { new: true }             // Return the updated document
      );
  
      // Check if the notification exists
      if (!updatedNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      // Respond with success if the notification was updated
      res.status(200).json({ message: 'Notification marked as read successfully', data: updatedNotification });
      
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ message: 'Failed to update notification', error: error.message });
    }
  };
  