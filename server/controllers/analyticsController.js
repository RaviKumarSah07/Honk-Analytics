const Honk = require("../models/Honk");

// GET /api/analytics/daily
// Returns honk counts grouped by day for a given city
const getDailyHonks = async (req, res) => {
  try {
    const city = req.query.city || "Ahmedabad";
    console.log("Requested city:", city);

    const dailyData = await Honk.aggregate([
      { $match: { city } },
      {
        $group: {
          _id: {
            year:  { $year:  "$timestamp" },
            month: { $month: "$timestamp" },
            day:   { $dayOfMonth: "$timestamp" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Format to readable date strings: "YYYY-MM-DD"
    const formatted = dailyData.map((item) => ({
      date: `${item._id.year}-${String(item._id.month).padStart(2, "0")}-${String(item._id.day).padStart(2, "0")}`,
      count: item.count,
    }));

    res.json({ city, data: formatted });
  } catch (error) {
    console.error("getDailyHonks error:", error);
    res.status(500).json({ message: "Failed to fetch daily honks" });
  }
};

// GET /api/analytics/peak-time
// Returns honk counts grouped by hour of day (0–23)
const getPeakTime = async (req, res) => {
  try {
    const city = req.query.city || "Ahmedabad";

    const hourlyData = await Honk.aggregate([
      { $match: { city } },
      {
        $group: {
          _id: { hour: { $hour: "$timestamp" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.hour": 1 } },
    ]);

    // Fill in missing hours with 0 so the chart always shows 24 bars
    const hourMap = {};
    hourlyData.forEach((item) => {
      hourMap[item._id.hour] = item.count;
    });

    const formatted = Array.from({ length: 24 }, (_, hour) => ({
      hour: `${String(hour).padStart(2, "0")}:00`,
      count: hourMap[hour] || 0,
    }));

    res.json({ city, data: formatted });
  } catch (error) {
    console.error("getPeakTime error:", error);
    res.status(500).json({ message: "Failed to fetch peak time data" });
  }
};

// GET /api/analytics/peak-day
// Returns the single day with the highest number of honks
const getPeakDay = async (req, res) => {
  try {
    const city = req.query.city || "Ahmedabad";

    const result = await Honk.aggregate([
      { $match: { city } },
      {
        $group: {
          _id: {
            year:  { $year:  "$timestamp" },
            month: { $month: "$timestamp" },
            day:   { $dayOfMonth: "$timestamp" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    if (result.length === 0) {
      return res.json({ city, peakDay: null, count: 0 });
    }

    const { year, month, day } = result[0]._id;
    const peakDay = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    res.json({ city, peakDay, count: result[0].count });
  } catch (error) {
    console.error("getPeakDay error:", error);
    res.status(500).json({ message: "Failed to fetch peak day" });
  }
};

module.exports = { getDailyHonks, getPeakTime, getPeakDay };
