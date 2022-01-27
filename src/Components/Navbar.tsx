import css from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import logo from "../assets/images/logo.svg";
<<<<<<< HEAD
import logoDark from "../assets/images/logo.svg";
import { ThemeContext } from "../ThemeContext";
=======
>>>>>>> 8448c758de06ce03ba8fbdf4b1ae288445bf90d3

function Navbar() {
  return (
    <nav>
      <ul>
        <li id={css.logo}>
          <Link to="/">
<<<<<<< HEAD
            <ThemeContext.Consumer>
              {({ theme }) => {
                let a = localStorage.getItem("theme");
                let src = a === "dark" ? logoDark : logo;
                return <img src={src} alt="gymhaan logo" />;
              }}
            </ThemeContext.Consumer>
=======
            <img src={logo} alt="gymhaan logo" />
>>>>>>> 8448c758de06ce03ba8fbdf4b1ae288445bf90d3
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
