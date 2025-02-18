const Hotel = require("../models/Hotel");

exports.AddHotel = async (req,res) => {
      const {hotel_state,hotel_city,hotel_name,distance_from,price,contact_no,hotel_addres,google_link} = req.body;

      try{
      const newArray = Hotel({
        hotel_state,
        hotel_city,
        hotel_name,
        distance_from,
        price,
        contact_no,
        hotel_addres,
        google_link
      });

      await newArray.save();
      res.status(200).json({message:"Hotels Added Successfully..."});
    }catch(error){
      res.status(500).json({message:"Something went wrong"});
    }
}

exports.HotelList = async (req,res) => {
   try{
    const list = await Hotel.find();
    res.status(200).json(list);
   }catch(error){
    res.status(500).json({message:"Something went wrong"});
   }
};

exports.DeletHotel = async (req,res) => {
    const { id } = req.params;
    try{
     const list = await Hotel.findByIdAndDelete(id);
     res.status(200).json({message:"Data Deleted Successfully.."});
    }catch(error){
     res.status(500).json({message:"Something went wrong"});
    }
}

exports.updateHotels = async (req,res) => {
    const {hotel_state,hotel_city,hotel_name,distance_from,price,contact_no,hotel_addres,google_link} = req.body;
    const {id}=req.params;
    try{
     
        const updatedHotel  = {
            hotel_state,
            hotel_city,
            hotel_name,
            distance_from,
            price,
            contact_no,
            hotel_addres,
            google_link
          };

      await Hotel.findByIdAndUpdate(id,updatedHotel, { new: true });
      res.status(200).json({message:"Data Updated Successfully.."});
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
};