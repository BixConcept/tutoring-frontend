import "../styles/Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/HaanerBarbaren/tutoring-frontend">
          Source Code
        </a>
      </div>
      <div>
        <Link to="/license">Lizenz</Link>
      </div>
      <div>Datenschutz</div>
      <div>Impressum</div>
    </footer>
  );
}

export default Footer;
