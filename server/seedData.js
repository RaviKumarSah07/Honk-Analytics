/**
 * seedData.js — Run this once to populate sample Ahmedabad honk data
 * Usage: node server/seedData.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Honk = require("./models/Honk");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/honk-analytics";

const locations = process.env.CITIES.split(",");

const generateSeedData = () => {
  const records = [];
  const now = new Date();

  for (let day = 0; day < 14; day++) {
    const honksToday = Math.floor(Math.random() * 160) + 40;

    for (let i = 0; i < honksToday; i++) {
      const timestamp = new Date(now);
      timestamp.setDate(now.getDate() - day);

      const rushHours = [8, 9, 10, 17, 18, 19, 20];
      const isRush = Math.random() > 0.4;

      const hour = isRush
        ? rushHours[Math.floor(Math.random() * rushHours.length)]
        : Math.floor(Math.random() * 24);

      timestamp.setHours(hour, Math.floor(Math.random() * 60), 0, 0);

      // ✅ Uniform distribution across cities
      const location = locations[Math.floor(Math.random() * locations.length)];

      records.push({
        city: location,
        vehicleId: `SEED-${day}-${i}`,
        timestamp,
      });
    }
  }

  return records;
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Honk.deleteMany({ city: "Ahmedabad" });
    console.log("Cleared existing Ahmedabad data");

    const data = generateSeedData();
    await Honk.insertMany(data);
    console.log(`Seeded ${data.length} honk records for Ahmedabad`);

    await mongoose.disconnect();
    console.log("Done. Disconnected.");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

seed();
