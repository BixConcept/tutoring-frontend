import css from "../styles/Footer.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { OurContext } from "../OurContext";
import DarkMode from "./DarkMode";

const Footer = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const context = useContext(OurContext);
  return (
    <footer
      className={css.footer}
      style={{ filter: context.cookieModalVisible ? "blur(8px)" : undefined }}
    >
      <ul>
        <li>
          <a href="https://github.com/BixConcept/tutoring-frontend">
            Source Code <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li>
          <Link to="/license">Lizenz</Link>
        </li>
        <li>
          <Link to="/privacy">Datenschutz</Link>{" "}
        </li>
        <li>
          <Link to="/imprint">Impressum</Link>
        </li>
        <li
          style={{
            color: "var(--text_color)",
            transition: "all 200ms ease-in-out",
            cursor: "pointer",
          }}
        >
          <DarkMode />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
