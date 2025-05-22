const mongoose = require('mongoose');

const onlineSchema = new mongoose.Schema({
  price_source: { type: String },
  hotel_name: { type: String },
  hotel_standed: { type: String },
  location: { type: String },
  check_in: { type: Date },
  check_out: { type: Date },
  in_time: { type: String },
  out_time: { type: String },
  meals_plan: { type: String },
  no_of_double_room: { type: Number },
  no_of_double_room_nights: { type: Number },
  no_of_double_room_cat: { type: String },
  no_of_single_room: { type: Number },
  no_of_single_room_nights: { type: Number },
  no_of_single_room_cat: { type: String },
  no_of_triple_room: { type: Number },
  no_of_triple_room_nights: { type: Number },
  no_of_triple_room_cat: { type: String },
  no_of_extra_room: { type: Number },
  no_of_extra_room_nights: { type: Number },
  no_of_extra_room_cat: { type: String },
  no_of_suite_room: { type: Number },
  no_of_suite_room_nights: { type: Number },
  no_of_suite_room_cat: { type: String },
  total_cost: { type: Number },
  doc_id:{type:mongoose.Schema.Types.ObjectId}
},{timestamps:true});

const Onlinehotel = mongoose.model("Onlinehotel", onlineSchema);
module.exports = Onlinehotel;
