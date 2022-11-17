import "./styles/App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { API_HOST } from "./index";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/UserDashboard";
import Find from "./pages/Find";
import Footer from "./Components/Footer";
import FourOFourPage from "./pages/404";
import Home from "./pages/Home";
import Imprint from "./pages/Imprint";
import LoginPage from "./pages/LoginPage";
import Navbar from "./Components/Navbar";
import { OurContext } from "./OurContext";
import Privacy from "./pages/Privacy";
import RegisterTutorPage from "./pages/RegisterTutorPage";
import ScrollToTop from "./Components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import { User } from "./Models";
import { UserPage } from "./pages/UserPage";
import Verify from "./pages/Verify";
import ApiDown from "./Components/ApiDown";
import Contribute from "./pages/Contribute";
import { useMediaPredicate } from "react-media-hook";

const App = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [width, setWidth] = useState(1920);
  const [apiDown, setApiDown] = useState(false);
  const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  console.log(preferredTheme);
  const [theme, setTheme] = useState<"dark" | "light">(preferredTheme);

  const updateDimensions = () => {
    const _width = window.innerWidth;
    setWidth(_width);
  };

  useEffect(() => {
    fetch(`${API_HOST}/stats`)
      .then((res) => {
        setApiDown(!res.ok);
      })
      .catch(() => setApiDown(true));
  }, []);

  useEffect(() => {
    // Rainbow Giant Styled Text
    console.log(
      `%cCurrent commit: ${process.env.REACT_APP_GIT_SHA}!`,
      "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
    );

    // test validity of token
    fetch(`${API_HOST}/user`, {
      credentials: "include",
      headers: { "X-Frontend-Path": document.location.pathname },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Error while fetching");
      })
      .then((body) => {
        // if the server returns something, a cookie exists => the user has already consented before
        setUser(body.content);
      })
      .catch((_) => {
        setUser(null);
      });

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="App">
      <OurContext.Provider
        value={{
          theme: theme,
          setTheme: setTheme,
          user: user,
          setUser: setUser,
          width: width,
        }}
      >
        {!apiDown ? (
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <div id="wrapper">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contribute" element={<Contribute />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterTutorPage />} />
                <Route
                  path="/register/:stepIndex"
                  element={<RegisterTutorPage />}
                />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/imprint" element={<Imprint />} />
                <Route path="/find/" element={<Find />} />
                <Route path="/find/:subject/:grade" element={<Find />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/verify/:code" element={<Verify />} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="*" element={<FourOFourPage />} />
              </Routes>
            </div>
            <Footer />
            <ToastContainer />
          </BrowserRouter>
        ) : (
          <ApiDown />
        )}
      </OurContext.Provider>
    </div>
  );
};

export default App;
