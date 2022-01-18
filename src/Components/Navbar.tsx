import "../styles/Navbar.scss";

function Navbar() {
  return (
    <nav>
      <ul>
        <li id="navbar-logo">
          <a href="/">
            <img src="/images/gymhaan_logo_neu.png" alt="" />
          </a>
        </li>
        <div id="login-register">
          <li>
            <a href="/login">Login</a>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
