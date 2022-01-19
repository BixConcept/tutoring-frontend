import css from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import logo from "../assets/images/gymhaan_logo_neu.png"

function Navbar() {
  return (
    <nav>
      <ul>
        <li id={css.logo}>
          <Link to="/">
            <img src={logo} alt="gymhaan logo (offiziell)" />
          </Link>
        </li>
        <li>
          <DarkMode />
        </li>
        <li>
          <div id={css.loginRegister}>
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
