const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const honkRoutes = require("./routes/honkroutes");
const Honk = require("./models/Honk");
const analyticsRoutes = require("./routes/analyticsRoutes");
require("dotenv").config();

const app = express();

// ✅ CORS setup using .env
const allowedOrigin = process.env.CLIENT_URL || "*";

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/honks", honkRoutes);
app.use("/api/analytics", analyticsRoutes);

// ✅ MongoDB connection (Atlas via .env)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Auto data generation (unchanged)
setInterval(async () => {
  const locations = process.env.CITIES.split(",");
  const randomLoc = locations[Math.floor(Math.random() * locations.length)];

  await Honk.create({
    vehicleId: "AUTO123",
    city: randomLoc
  });

  console.log("Auto data added");
}, 3000);

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));