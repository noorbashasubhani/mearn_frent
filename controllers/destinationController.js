const Destination = require("../models/Destination");

exports.createDestination = async(req,res) =>{
   const {destination_name,latitude,longitude,destination,is_country,is_state,is_city,is_cruise,country_id,state_id}=req.body;
   const user_id=req.user.userId;
   try{
    const newData = new Destination({
        destination_name,
        latitude,
        longitude,
        destination,
        is_country,
        is_state,
        is_city,
        is_cruise,
        country_id,
        state_id,
        added_by:user_id
    });
    const saveddata = await newData.save();
    if(!saveddata){
        res.status(400).json({message:"Unable to load"});
    }

    res.status(200).json({message:"Saved Successfully",data:saveddata});
   }catch(error){
    res.status(500).json({message:"Unable to load"});
   }
}

exports.getAllDestination = async (req,res) => {
  try{
   const list = await Destination.find();
   res.status(200).json({message:"SUCC",data:list});
  }catch(error){
    res.status(200).json({message:"FAILD",error});
  }
}

exports.getSinglerowDestination = async(req,res)=>{
    const {row_id} = req.params;
    try{
    const list = await Destination.findOne({_id:row_id});
    res.status(200).json({message:"succe",data:list});
    }catch(error){
    res.status(500).json({message:"failed",data:list});
    }
}

exports.deleteDestination = async (req,res) => {
const {row_id}=req.params;
    try{
        const destinationlist = await Destination.findByIdAndDelete(row_id);
        res.status(200).json({message:"Deleted Success Data success"});
    }catch(error){
     res.status(500).json({message:"error comitn"});
    }
}

exports.updateDestination = async (req, res) => {
    const { destination_name, latitude, longitude, destination, is_country, is_state, is_city, is_cruise, country_id, state_id } = req.body;
    const { row_id } = req.params;  // Getting row_id from URL params

    try {
        // Use findByIdAndUpdate to update the document by its row_id (_id)
        const updatedData = await Destination.findByIdAndUpdate(
            row_id,  // ID of the destination to update
            {
                destination_name,
                latitude,
                longitude,
                destination,
                is_country,
                is_state,
                is_city,
                is_cruise,
                country_id,
                state_id
            },
            { new: true }  // Ensures that the updated document is returned
        );

        // Check if the document was found and updated
        if (!updatedData) {
            return res.status(404).json({ message: "Destination not found" });
        }

        // Send success response with the updated data
        res.status(200).json({ message: "Updated Data Successfully", data: updatedData });

    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: "Unable to update data", error: error.message });
    }
};
