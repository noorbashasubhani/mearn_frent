const mongoose=require("mongoose");
const notificationSchema = mongoose.Schema({
    from_id:{
        type:String
    },
    to_id:{
        type:String
    },
    message_heading:{
        type:String
    },
    message_body:{
        type:String
    },
    status:{
        type:String
    },
    created_date:{
        type:Date,
        default:Date.now
    },
    message_read:{
        type:String
    }
})
const Notification = mongoose.model("Notification",notificationSchema);
module.exports=Notification;

