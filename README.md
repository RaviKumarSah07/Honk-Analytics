# 🔊 Honk Analytics

A real-time noise pollution analytics platform built with the **MERN stack**. Honk Analytics captures vehicle horn data across Indian cities, visualizes it in beautiful dashboards, and helps urban planners, researchers, and curious citizens understand traffic noise patterns.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-f97316?style=flat-square)

---

## 📸 Screenshots

| Overview Dashboard | Ahmedabad Dashboard |
|---|---|
| Dark themed landing with live stats | City-level analytics with charts |

> Both dashboards auto-refresh every 5 seconds with live data.

---

## ✨ Features

- 📡 **Real-time data** — dashboards auto-refresh every 5 seconds
- 🏙️ **Multi-city support** — global overview + per-city deep dives
- 📊 **Interactive charts** — bar charts, area charts, pie charts via Recharts
- 📍 **Location leaderboard** — ranked noise hotspots with animated progress bars
- 🚗 **Vehicle tracking** — unique vehicle count across all recorded honks
- 🔥 **Peak day & hour detection** — MongoDB aggregation pipelines for insights
- 📱 **Responsive design** — works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Create React App), Recharts, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| API Style | RESTful |

---

## 📁 Project Structure

```
honk-analytics/
├── client/                        # React frontend
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx           # Overview dashboard
│       │   ├── Home.css
│       │   ├── AhmedabadDashboard.jsx  # City-level analytics
│       │   └── AhmedabadDashboard.css
│       ├── components/
│       │   ├── StatCard.jsx       # Metric display card
│       │   ├── ChartCard.jsx      # Chart wrapper card
│       │   └── LoadingSpinner.jsx
│       ├── hooks/
│       │   └── useFetch.js        # Reusable data-fetching hook
│       ├── App.js                 # Router + Navbar
│       └── App.css
│
└── server/                        # Express backend
    ├── models/
    │   └── Honk.js                # Mongoose schema
    ├── routes/
    │   └── honkRoutes.js          # /api/honks routes
    │   └── analyticsRoutes.js     # /api/analytics routes
    ├── controllers/
    │   └── analyticsController.js # Aggregation logic
    ├── seedData.js                # Sample data generator
    └── index.js                   # Express entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/RaviKumarSah07/Honk-Analytics.git
cd Honk-Analytics
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
MONGO_URI=mongodb://localhost:27017/honk-analytics
PORT=5000
```

### 3. Set up the client

```bash
cd client
npm install
```

If your backend runs on a port other than `5000`, create a `.env` file inside `client/`:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Seed sample data (optional but recommended)

```bash
# From the project root
node server/seedData.js
```

This generates ~14 days of realistic Ahmedabad honk data with rush-hour weighting.

### 5. Run both servers

**Option A — Run separately (two terminals):**

```bash
# Terminal 1
cd server && npm start

# Terminal 2
cd client && npm start
```

**Option B — Run together with concurrently:**

Install at the root level:

```bash
npm install concurrently --save-dev
```

Add to root `package.json`:

```json
"scripts": {
  "server": "cd server && node index.js",
  "client": "cd client && npm start",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

Then:

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

---

## 🔌 API Reference

### Honks

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/honks` | Record a new honk |
| `GET` | `/api/honks` | Get all honks |
| `GET` | `/api/honks/count` | Get total honk count |
| `GET` | `/api/honks/by-location` | Get honks grouped by location |

**POST `/api/honks` — Request body:**
```json
{
  "vehicleID": "GJ01AB1234",
  "location": "Maninagar"
}
```

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/analytics/daily?city=Ahmedabad` | Honks per day |
| `GET` | `/api/analytics/peak-time?city=Ahmedabad` | Hour-wise distribution |
| `GET` | `/api/analytics/peak-day?city=Ahmedabad` | Day with most honks |

---

## 🗄️ Database Schema

```js
// Honk document
{
  vehicleID: String,   // e.g. "GJ01AB1234"
  location:  String,   // e.g. "Maninagar"
  timestamp: Date      // auto-set on creation (default: Date.now)
}
```

---

## 🗺️ Roadmap

- [ ] Add more city dashboards (Mumbai, Delhi, Bangalore)
- [ ] Authentication for data submission
- [ ] Export data as CSV
- [ ] Heatmap visualization on a city map
- [ ] WebSocket support for true real-time push updates
- [ ] Docker support for easy deployment

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Ravi Kumar Sah**
- GitHub: [@RaviKumarSah07](https://github.com/RaviKumarSah07)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ using the MERN stack · Real data, real noise, real insights.
