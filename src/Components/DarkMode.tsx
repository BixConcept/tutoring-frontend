import React from "react";
import "../styles/darkModeButton.scss";

const DarkMode = () => {
  const body = document.body;
  let theme: string = "light";

  if (localStorage) {
    let value = localStorage.getItem("theme");
    if (value === "light" || value === "dark") {
      body.classList.add(value);
      theme = value;
    } else {
      body.classList.add("light");
    }
  }

  const toggleDarkMode = () => {
    if (theme === "dark") {
      body.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
      theme = "light";
    } else {
      body.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      theme = "dark";
    }
  };

  return (
    <div id="dark-mode-switch">
      <label className="toggle">
        <input type="checkbox" onChange={() => toggleDarkMode()} />
        <span className="slider"></span>
        <span className="labels"></span>
      </label>
    </div>
  );
};

export default DarkMode;
