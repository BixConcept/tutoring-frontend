import css from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import logo from "../assets/images/gymhaan_logo_neu.png";
import logoDark from "../assets/images/gymhaan_logo_neu_dark.png";
import { ThemeContext } from "../ThemeContext";

function Navbar() {
  return (
    <nav>
      <ul>
        <li id={css.logo}>
          <Link to="/">
            <ThemeContext.Consumer>
              {({ theme }) => {
                let src = theme === "dark" ? logoDark : logo;
                return <img src={src} alt="gymhaan logo" />;
              }}
            </ThemeContext.Consumer>
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
