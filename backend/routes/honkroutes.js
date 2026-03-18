const express=require("express");
const router=express.Router();
const Honk=require("../models/Honk");

router.post("/",async(req,res) => {
    const {vehicleID, location}=req.body;

    const honk= new Honk({vehicleID,location});

    await honk.save();

    res.json({message: "Honk stored successfully"});
});

router.get("/",async (req,res) => {
    const honks=await Honk.find();
    res.json(honks);
});

router.get("/by-location", async(req,res) => {
    const data= await Honk.aggregate([
        {
            $group: {
                _id: "$location",
                count: {$sum: 1}
            }
        }
    ]);

    const formatted=data.map(item => (
        {
            location: item._id,
            count: item.count
        }
    ));
    res.json(formatted);
});

router.get("/count", async (req,res) => {
    const total= await Honk.countDocuments();

    res.json({totalHonks: total});
});


module.exports= router;