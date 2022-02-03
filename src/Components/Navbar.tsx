import css from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import logo from "../assets/images/logo.svg";


function Navbar() {
  return (
    <nav>
      <ul>
        <li id={css.logo}>
          <Link to="/">
            <img src={logo} alt="gymhaan logo" />
          </Link>
        </li>
        <div id={css.loginRegister}>
          <li>
            <DarkMode />
          </li>
          <li>
            <Link to="/login">
              <span className={css.backdrop}>Login</span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
