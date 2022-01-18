import "../styles/Navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li id="navbar-logo">
          <Link to="/">
            <img src="/images/gymhaan_logo_neu.png" alt="" />
          </Link>
        </li>
        <div id="login-register">
          <li>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
