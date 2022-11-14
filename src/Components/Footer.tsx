import { Link } from "react-router-dom";
import css from "../styles/Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = (): JSX.Element => {
  return (
    <footer className={css.footer}>
      <ul>
        <li></li>
        <li className={css.topLine}>
          <Link to="/contribute">Mitmachen</Link>{" "}
        </li>
        <li className={css.topLine}>
          <a href="https://github.com/BixConcept/tutoring-frontend/blob/main/LICENSE">
            Lizenz
          </a>
        </li>
        <li className={css.topLine}>
          <Link to="/privacy">Datenschutz</Link>{" "}
        </li>
        <li className={css.topLine}>
          <Link to="/imprint">Impressum</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
