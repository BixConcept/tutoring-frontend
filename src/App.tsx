import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./Components/Footer";
import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import License from "./pages/License";
import Privacy from "./pages/Privacy";
import Imprint from "./pages/Imprint";
import { ThemeContext } from "./ThemeContext";
import { useState } from "react";
import FourOFourPage from "./pages/404";
import Find from "./pages/Find";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        <BrowserRouter>
          <Navbar />
          <div id="wrapper">
            <Routes>
              <Route path="*" element={<FourOFourPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Find />} />
              <Route path="/license" element={<License />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="/find" element={<Find />} />
            </Routes>
          </div >
          <Footer />
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
