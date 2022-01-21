import css from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";

function Navbar() {
  return (
    <nav>
      <ul>
        <li id={css.logo}>
          <Link to="/">
            <img src="/images/gymhaan_logo_neu.png" alt="" />
          </Link>
        </li>
        <li>
          <DarkMode />
        </li>
        <li>
          <div id={css.loginRegister}>
            <Link to="/login">
              <span className={css.backdrop}>Login</span>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
