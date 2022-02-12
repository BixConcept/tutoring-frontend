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
import { OurContext } from "./OurContext";
import { useEffect, useState } from "react";
import FourOFourPage from "./pages/404";
import Find from "./pages/Find";
import Dashboard from "./pages/UserDashboard";
import ScrollToTop from "./Components/ScrollToTop";
import { User } from "./Models";
import { API_HOST } from "./index";
import Verify from "./pages/Verify";

const App = (): JSX.Element => {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // test validity of token
    fetch(`${API_HOST}/user`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((body) => {
        setUser(body.content);
        console.log(body.content);
      })
      .catch();
  }, []);

  return (
    <div className="App">
      <OurContext.Provider
        value={{
          theme: theme,
          setTheme: setTheme,
          user: user,
          setUser: setUser,
        }}
      >
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <div id="wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register/:stepIndex" element={<RegisterPage />} />
              <Route path="/license" element={<License />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="/find" element={<Find />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/verify/:code" element={<Verify />} />
              <Route path="*" element={<FourOFourPage />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </OurContext.Provider>
    </div>
  );
};

export default App;
