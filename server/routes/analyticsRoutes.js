const express = require("express");
const router = express.Router();
const {
  getDailyHonks,
  getPeakTime,
  getPeakDay,
} = require("../controllers/analyticsController");

// Each route maps to a controller function — logic lives in the controller
router.get("/daily",     getDailyHonks);
router.get("/peak-time", getPeakTime);
router.get("/peak-day",  getPeakDay);

module.exports = router;
