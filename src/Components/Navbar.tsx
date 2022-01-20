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
				let a = localStorage.getItem("theme");
                let src = a === "dark" ? logoDark : logo;
                return <img src={src} alt="gymhaan logo" />;
              }}
            </ThemeContext.Consumer>
          </Link>
        </li>
        <div id={css.loginRegister}>
          <li>
            <DarkMode />
          </li>
          <li>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
