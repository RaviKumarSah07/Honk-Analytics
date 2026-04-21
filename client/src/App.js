import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider }    from "./context/ThemeContext";
import Navbar               from "./components/Navbar";
import LandingPage          from "./pages/LandingPage";
import Home                 from "./pages/Home";
import AhmedabadDashboard   from "./pages/AhmedabadDashboard";
import "./styles/theme.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"          element={<LandingPage />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/ahmedabad" element={<AhmedabadDashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
