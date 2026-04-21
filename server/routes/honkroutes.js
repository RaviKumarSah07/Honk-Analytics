const express = require("express");
const router = express.Router();
const Honk = require("../models/Honk");

const resolveCity = (body = {}) => body.city || body.location || "Ahmedabad";
const resolveVehicleId = (body = {}) => body.vehicleId || body.vehicleID || null;

router.post("/", async (req, res) => {
  try {
    const honk = new Honk({
      city: resolveCity(req.body),
      vehicleId: resolveVehicleId(req.body),
      timestamp: req.body.timestamp || undefined,
    });

    await honk.save();

    res.status(201).json({
      message: "Honk stored successfully",
      honk: {
        id: honk._id,
        city: honk.city,
        location: honk.city,
        vehicleId: honk.vehicleId,
        vehicleID: honk.vehicleId,
        timestamp: honk.timestamp,
      },
    });
  } catch (error) {
    console.error("Failed to store honk:", error);
    res.status(500).json({ message: "Failed to store honk" });
  }
});

router.get("/", async (req, res) => {
  try {
    const honks = await Honk.find().sort({ timestamp: -1 }).lean();
    const normalized = honks.map((honk) => ({
      ...honk,
      location: honk.city || honk.location || "Unknown",
      vehicleID: honk.vehicleId || honk.vehicleID || null,
    }));

    res.json(normalized);
  } catch (error) {
    console.error("Failed to fetch honks:", error);
    res.status(500).json({ message: "Failed to fetch honks" });
  }
});

router.get("/by-location", async (req, res) => {
  try {
    const data = await Honk.aggregate([
      {
        $group: {
          _id: { $ifNull: ["$city", "$location"] },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1, _id: 1 } },
    ]);

    const formatted = data
      .filter((item) => item._id)
      .map((item) => ({
        location: item._id,
        count: item.count,
      }));

    res.json(formatted);
  } catch (error) {
    console.error("Failed to fetch honks by location:", error);
    res.status(500).json({ message: "Failed to fetch honks by location" });
  }
});

router.get("/count", async (req, res) => {
  try {
    const total = await Honk.countDocuments();
    res.json({ totalHonks: total });
  } catch (error) {
    console.error("Failed to fetch honk count:", error);
    res.status(500).json({ message: "Failed to fetch honk count" });
  }
});

module.exports = router;
