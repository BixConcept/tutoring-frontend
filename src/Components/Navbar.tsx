import css from "../styles/Navbar.module.scss";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import general from "../styles/general.module.scss";
import { useContext, useEffect } from "react";
import { OurContext } from "../OurContext";
import { API_HOST } from "..";
import Alert from "./Alert";
import { setSourceMapRange } from "typescript";

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
        <div id={css.links}>
          <li>
            {context.user !== null ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  fetch(`${API_HOST}/user/logout`, {
                    credentials: "include",
                  }).then((res) => {
                    if (res.ok) {
                      context.setUser(null);
                    } else {
                      Alert("Fehler beim Ausloggen.", "error", context.theme);
                    }
                  });
                }}
              >
                Abmelden
              </a>
            ) : null}
          </li>
          <li>
            {context.user === null ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to="/dashboard">Mein Account</Link>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
