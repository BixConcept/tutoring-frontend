import css from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import general from "../styles/general.module.scss";
import { useContext, useEffect } from "react";
import { OurContext } from "../OurContext";

function Navbar() {
  const context = useContext(OurContext);

  useEffect(() => {
    console.log(context);
  });

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
            {context.user === null ? (
              <Link to="/login">
                <span className={general.text_marker}>Login</span>
              </Link>
            ) : (
              <Link to="/dashboard">
                <span className={general.text_marker}>Mein Account</span>
              </Link>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
