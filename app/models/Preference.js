const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const Preference = Schema({
  user: { type: String , required: true },
  darkMode: { type: Boolean, default: false },
  notificationEnabled: { type: Boolean, default: true },
  language: { type: String, default: 'fr' },
})

Preference.plugin(uniqueValidator);
module.exports = mongoose.model("preference",Preference);
