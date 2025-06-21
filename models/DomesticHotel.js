const mongoose = require('mongoose');

const HotelDetailsSchema = new mongoose.Schema({
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', // <-- refers to your Hotel model
    required: true
  },
  hotel_rating: { type: String, default: '' },
  location: { type: String, required: true },
  contact_person: { type: String, default: '' },
  contact_number: { type: String, default: '' },
  check_in_date: { type: String, default: '' }, // or Date if you want
  check_out_date: { type: String, default: '' },
  in_time: { type: String, default: '' },
  out_time: { type: String, default: '' },
  meals_plan: { type: String, default: '' },

  single_room_cost: { type: Number, default: 0 },
  double_room_cost: { type: Number, default: 0 },
  triple_room_cost: { type: Number, default: 0 },
  extra_room_cost: { type: Number, default: 0 },

  no_of_single_rooms: { type: Number, default: 0 },
  no_of_double_rooms: { type: Number, default: 0 },
  no_of_triple_rooms: { type: Number, default: 0 },
  no_of_extra_rooms: { type: Number, default: 0 },

  no_of_single_room_nights: { type: Number, default: 0 },
  no_double_room_nights: { type: Number, default: 0 },
  no_of_triple_room_nights: { type: Number, default: 0 },
  no_of_extra_room_nights: { type: Number, default: 0 },

  single_category: { type: String, default: '' },
  double_category: { type: String, default: '' },
  triple_category: { type: String, default: '' },
  extra_category: { type: String, default: '' },

  cost_for_single: { type: Number, default: 0 },
  cost_for_double: { type: Number, default: 0 },
  cost_for_triple: { type: Number, default: 0 },
  cost_for_extra: { type: Number, default: 0 },

  final_cost: { type: Number, default: 0 },

  doc_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Lead' // or whichever document this belongs to
  }
}, { timestamps: true });

module.exports = mongoose.model('DomesticHotel', HotelDetailsSchema); 