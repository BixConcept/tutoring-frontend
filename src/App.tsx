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
import { ToastContainer } from "react-toastify";
import Cookie from "./Components/Cookie";

const App = (): JSX.Element => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [user, setUser] = useState<User | null>(null);
  const [cookieConsent, setCookieConsent] = useState<boolean>(
    localStorage.getItem("cookieConsent") === "true"
  );

  const [cookieModalVisible, setCookieModalVisible] = useState<boolean>(false);

  useEffect(() => {
    console.log(cookieConsent);
    // test validity of token
    fetch(`${API_HOST}/user`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("asdf");
      })
      .then((body) => {
        // if the server returns something, a cookie exists => the user has already consented before
        updateCookieConsent(true);
        setUser(body.content);
        console.log(body.content);
      })
      .catch((_) => {
        setUser(null);
        if (!cookieConsent) {
          setCookieModalVisible(true);
        }
      });
  }, []);

  function updateCookieConsent(status: boolean) {
    setCookieConsent(status);
    localStorage.setItem("cookieConsent", status.toString());
    setCookieModalVisible(false);
  }

  return (
    <div className="App">
      <OurContext.Provider
        value={{
          theme: theme,
          setTheme: setTheme,
          user: user,
          setUser: setUser,
          cookieConsent,
          setCookieConsent: updateCookieConsent,
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
          <Cookie
            visible={cookieModalVisible}
            onConsent={updateCookieConsent}
          />
          <Footer />
          <ToastContainer />
        </BrowserRouter>
      </OurContext.Provider>
    </div>
  );
};

export default App;
