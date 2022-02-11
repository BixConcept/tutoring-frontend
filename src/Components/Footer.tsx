import css from "../styles/Footer.module.scss";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = (): JSX.Element => {
  return (
    <footer className={css.footer}>
      <a href="https://github.com/BixConcept/tutoring-frontend">
        Source Code <FontAwesomeIcon icon={faGithub} />
      </a>
      <Link to="/license">Lizenz</Link>
      <Link to="/privacy">Datenschutz</Link>
      <Link to="/imprint">Impressum</Link>
      <a href="">
        <DarkMode />
      </a>
    </footer>
  );
};

export default Footer;
