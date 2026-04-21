import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function Navbar() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { to: "/",          label: "Home"       },
    { to: "/dashboard", label: "Overview"   },
    { to: "/ahmedabad", label: "Ahmedabad"  },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-icon">🔊</span>
        <span className="navbar__brand-text">Honk<span className="navbar__brand-accent">Analytics</span></span>
      </Link>

      <div className="navbar__links">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`navbar__link ${pathname === to ? "navbar__link--active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <button
        className="navbar__theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}

export default Navbar;
