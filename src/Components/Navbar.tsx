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
        <ul>
          <div id={css.links}>
            {context.user !== null ? <a href="#">Abmelden</a> : null}
            <li>
              {context.user === null ? (
                <Link to="/login">Login</Link>
              ) : (
                <Link to="/dashboard">Mein Account</Link>
              )}
            </li>
          </div>
        </ul>
      </ul>
    </nav>
  );
}

export default Navbar;
