import { useEffect } from "react";
import { useState } from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DarkMode = () => {
  const body = document.body;
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (localStorage) {
      let value = localStorage.getItem("theme");
      if (value === "light" || value === "dark") {
        body.classList.add(value);
        setTheme(value);
      } else {
        body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleDarkMode = (callback: (newTheme: "dark" | "light") => void) => {
    if (theme === "dark") {
      body.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
      setTheme("light");
      callback("light");
    } else {
      body.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      callback("dark");
    }
  };

  return (
    <button
      onClick={(e) => {
        toggleDarkMode(setTheme);
        e.preventDefault();
      }}
      style={{ cursor: "pointer" }}
    >
      <FontAwesomeIcon
        type="checkbox"
        icon={localStorage.getItem("theme") === "dark" ? faSun : faMoon}
      />
    </button>
  );
};

export default DarkMode;
