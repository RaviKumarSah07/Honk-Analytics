const mongoose = require("mongoose");

const honkSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    default: "Ahmedabad",
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Honk", honkSchema);
