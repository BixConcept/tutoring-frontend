import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [switchState, setSwitchState] = useState(false);
  return (
    <nav>
      <ul>
        <li id="navbar-logo">
          <Link to="/">
            <img src="/images/gymhaan_logo_neu.png" alt="" />
          </Link>
        </li>
        <li>
          <div id="dark-mode-switch">
            <label className="toggle">
              <input
                type="checkbox"
                onChange={(e) => setSwitchState(e.target.checked)}
              />
              <span className="slider"></span>
              <span className="labels"></span>
            </label>
          </div>
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
