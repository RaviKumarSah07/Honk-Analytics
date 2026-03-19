const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const honkRoutes=require("./routes/honkroutes");
const Honk=require("./models/Honk")
const analyticsRoutes = require("./routes/analyticsRoutes");


PORT=5000;

const app= express();

app.use(cors())
app.use(express.json());

app.use("/api/honks",honkRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/yhonkDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

setInterval(async () => {
  const locations = ["Ahmedabad", "Surat", "Mumbai"];
  const randomLoc = locations[Math.floor(Math.random() * locations.length)];

  await Honk.create({
    vehicleId: "AUTO123",
    location: randomLoc
  });

  console.log("Auto data added");
}, 3000);


app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => console.log("Server running on port 5000"));""