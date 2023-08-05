  const mongoose = require("mongoose");
  const uniqueValidator = require("mongoose-unique-validator");
  const Schema = mongoose.Schema;

const TouristSpot = Schema({
    name: { 
      en: { type: String, required: true }, 
      fr: { type: String, required: true }
    },
    description: 
    { 
      en: { type: String, required: true }, 
      fr: { type: String, required: true }
    },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      },
    images: { type: [String], required: true },
    videos: { type: [String], required: true },
    html_content: { 
      en: { type: String, required: true }, 
      fr: { type: String, required: true }
    },
    created_at: { type: Date, default: Date.now }
});

TouristSpot.plugin(uniqueValidator)
module.exports = mongoose.model("tourist_spots" , TouristSpot);