const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
    team_name:{
        type:String,
    },
    travel_type:{
        type:String
    },
    dept_name:{
        type:String
    },
    dept_head:{
        type:String
    },
    dept_lead:{
        type:String
    },
    team_employees:{
        type:[String]
    },
    created_date:{
        type:Date,
        default:Date.now
    },
    added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const Team = mongoose.model('Team',teamSchema);
module.exports=Team;