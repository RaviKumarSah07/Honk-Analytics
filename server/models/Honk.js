const mongoose = require("mongoose");

const honkSchema = new mongoose.Schema({
  vehicleId: {
    type: String,
    trim: true,
    default: null,
  },
  city: {
    type: String,
    required: true,
    default: "Ahmedabad",
    trim: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Honk", honkSchema);
