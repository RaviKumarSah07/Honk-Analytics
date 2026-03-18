const mongoose=require('mongoose');

const honkSchema=new mongoose.Schema({
    vehicleID: String,
    location: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model("Honk", honkSchema);