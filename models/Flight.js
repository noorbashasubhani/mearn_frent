const mongoose=require('mongoose');

const flightSchema=new mongoose.Schema({

 if_fare:{type:String},
 group_provided_by:{type:String},
 fare_validity:{type:String},
 fare_source:{type:String},
 travel_type:{type:String},
 no_of_adults:{type:Number},
 no_of_children:{type:Number},
 no_of_infants:{type:String},
 total_pax:{type:String},
 on_flight_name:{type:String},
 on_flight_no:{type:String},
 on_from_city:{type:String},
 on_to_city:{type:String},
 on_from_terminal:{type:String},
 on_to_terminal:{type:String},
 on_start_date:{type:Date},
 on_reach_date:{type:Date},
 on_duration:{type:String},
 on_hand_bag:{type:String},
 on_cabin_bag:{type:String},
 on_class_type:{type:String},
 r_flight_name:{type:String},
 r_flight_no:{type:String},
 r_from_city:{type:String},
 r_to_city:{type:String},
 r_from_terminal:{type:String},
 r_to_terminal:{type:String},
 r_start_date:{type:Date},
 r_reach_date:{type:Date},
 r_duration:{type:String},
 r_hand_bag:{type:String},
 r_cabin_bag:{type:String},
 r_class_type:{type:String},
 flight_cost_consider:{type:Number},
 bagage_cost:{type:Number},
 total_flight_cost:{type:Number},
 doc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' } // ✅ Correct

},{
    timestamps:true
});

const Flight=mongoose.model("Flight",flightSchema);
module.exports=Flight;