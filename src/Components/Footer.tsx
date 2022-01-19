import css from "../styles/Footer.module.module.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <a href="https://github.com/HaanerBarbaren/tutoring-frontend">
        Source Code
      </a>
      <Link to="/license">Lizenz</Link>
      <Link to="/imprint">Impressum</Link>
      <Link to="/privacy">Datenschutz</Link>
    </footer>
  );
}

export default Footer;
