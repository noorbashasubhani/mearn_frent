const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
    hotel_state:{
        type:String
    },
    hotel_city:{
        type:String
    },
    hotel_name:{
        type:String
    },
    distance_from:{
        type:String,    
    },
    price:{
        type:String,    
    },
    contact_no:{
        type:String,    
    },
    hotel_addres:{
        type:String,    
    },
    google_link:{
        type:String,    
    }

})

const Hotel = mongoose.model("Hotel",hotelSchema);
module.exports = Hotel;

