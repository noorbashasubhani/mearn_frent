const mongoose = require("mongoose");

const EducationSchema = mongoose.Schema({
    heigher_education:{
        type:String,
    },
    qualification_year:{
        type:String,
    },
    percenteage:{
        type:String,
    },
    institute_name:{
        type:String
    },
    google_link:{
        type:String
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    }
});
const Education = mongoose.model('Education', EducationSchema);
module.exports = Education;