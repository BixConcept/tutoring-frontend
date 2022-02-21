import css from "../styles/Footer.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = (): JSX.Element => {
  return (
    <footer className={css.footer}>
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
      </ul>
    </footer>
  );
};

export default Footer;
