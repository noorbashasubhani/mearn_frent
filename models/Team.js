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
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    dept_lead:{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    team_employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // or 'Employee' — depends on your model name
    }],
    added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
},{
    timestamps:true
})

const Team = mongoose.model('Team',teamSchema);
module.exports=Team;