import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OurContext } from "../OurContext";

const DarkMode = () => {
  const body = document.body;
  const context = useContext(OurContext);

  useEffect(() => {
    if (localStorage) {
      let value = localStorage.getItem("theme");
      if (value === "light" || value === "dark") {
        body.classList.add(value);
        context.setTheme(value);
      } else {
        body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        context.setTheme("dark");
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleDarkMode = (callback: (newTheme: "dark" | "light") => void) => {
    if (context.theme === "dark") {
      body.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
      callback("light");
    } else {
      body.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      callback("dark");
    }
  };

  return (
    <button
      onClick={(e) => {
        toggleDarkMode(context.setTheme);
        e.preventDefault();
      }}
      style={{ cursor: "pointer" }}
    >
      {context.width > 600 ? (
        <FontAwesomeIcon
          type="checkbox"
          icon={localStorage.getItem("theme") === "dark" ? faSun : faMoon}
        />
      ) : localStorage.getItem("theme") === "dark" ? (
        "Light mode"
      ) : (
        "Dark mode"
      )}
    </button>
  );
};

export default DarkMode;
