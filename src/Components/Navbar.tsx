import { NavigateFunction, useNavigate } from "react-router";
import { useContext, useState } from "react";

import { API_HOST } from "..";
import Alert from "./Alert";
import { AuthLevel } from "../Models";
import DarkMode from "./DarkMode";
import { Link } from "react-router-dom";
import { OurContext } from "../OurContext";
import css from "../styles/Navbar.module.scss";
import logo from "../assets/images/logo.svg";

export default function Navbar() {
  const context = useContext(OurContext);
  const [count, setCount] = useState<number>(0);
  const [lastClick, setLastClick] = useState<Date>(new Date());
  const navigate: NavigateFunction = useNavigate();

  return (
    <nav>
      <ul>
        <li
          id={css.logo}
          onClick={() => {
            setCount(
              new Date().getTime() - lastClick.getTime() < 1000 ? count + 1 : 0
            );
            setLastClick(new Date());
          }}
        >
          <Link to="/">
            <img src={logo} alt="gymhaan logo" />
            {count > 20 ? <span>powered by Bix|Concept</span> : null}
          </Link>
        </li>
        <div id={css.links}>
          <li
            style={{
              color: "var(--text_color)",
              transition: "all 200ms ease-in-out",
              cursor: "pointer",
            }}
          >
            <DarkMode />
          </li>
          {context.user !== null ? (
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();

                  fetch(`${API_HOST}/user/logout`, {
                    credentials: "include",
                    method: "POST",
                    headers: { "X-Frontend-Path": document.location.pathname },
                  }).then((res) => {
                    if (res.ok) {
                      context.setUser(null);
                      navigate("/");
                    } else {
                      Alert("Fehler beim Ausloggen.", "error", context.theme);
                    }
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                Abmelden
              </button>
            </li>
          ) : null}
          <li>
            {context.user === null ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to="/dashboard">Mein Account</Link>
            )}
          </li>
          {context.user?.authLevel === AuthLevel.Admin ? (
            <li>
              <Link to="/dashboard/admin">Admin</Link>
            </li>
          ) : null}
        </div>
      </ul>
    </nav>
  );
}
