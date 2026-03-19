import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home               from "./pages/Home";
import AhmedabadDashboard from "./pages/AhmedabadDashboard";
import "./App.css";

// ─── Navbar — highlights active link ─────────────────────────────────────────
function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="navbar">
      <span className="navbar__brand">🔊 Honk Analytics</span>
      <div className="navbar__links">
        <Link to="/"          className={`navbar__link ${pathname === "/"          ? "navbar__link--active" : ""}`}>Overview</Link>
        <Link to="/ahmedabad" className={`navbar__link ${pathname === "/ahmedabad" ? "navbar__link--active" : ""}`}>Ahmedabad</Link>
      </div>
    </nav>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/ahmedabad" element={<AhmedabadDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
