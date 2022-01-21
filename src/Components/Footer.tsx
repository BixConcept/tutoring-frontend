import css from "../styles/Footer.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className={css.footer}>
      <a href="https://github.com/HaanerBarbaren/tutoring-frontend">
        Source Code <FontAwesomeIcon icon={faGithub} />
      </a>
      <Link to="/license">Lizenz</Link>
      <Link to="/imprint">Impressum</Link>
      <Link to="/privacy">Datenschutz</Link>
    </footer>
  );
}

export default Footer;
