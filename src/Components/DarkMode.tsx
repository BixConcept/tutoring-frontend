import { useEffect } from "react";
import { useState } from "react";
import "../styles/darkModeButton.scss";

const DarkMode = () => {
  const body = document.body;
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (localStorage) {
      let value = localStorage.getItem("theme");
      if (value === "light" || value === "dark") {
        body.classList.add(value);
        setTheme(value);
      } else {
        body.classList.add("light");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (theme === "dark") {
      body.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      body.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <div id="dark-mode-switch">
      <label className="toggle">
        <input
          type="checkbox"
          onChange={() => toggleDarkMode()}
          checked={theme === "dark"}
        />
        <span className="slider"></span>
        <span className="labels"></span>
      </label>
    </div>
  );
};

export default DarkMode;
