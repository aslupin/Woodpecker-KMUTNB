const mongoose = require("mongoose");

const PMsSchema = mongoose.Schema({
  SITE: {type: String},
  AC1: { type: String },
  AC2: { type: String },
  DT: { type: String },
});

module.exports = mongoose.model("PM", PMsSchema);
