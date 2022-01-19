import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import DarkMode from "./DarkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav>
      <ul>
        <li id="navbar-logo">
          <Link to="/">
            <img src="/images/gymhaan_logo_neu.png" alt="" />
          </Link>
        </li>
        <li>
          <DarkMode />
        </li>
        <li>
          <div id="login-register">
            <Link to="/login">
              <span>Login</span>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
