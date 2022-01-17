import "../styles/Navbar.scss";

function Navbar() {
  return (
    <nav>
      <ul>
        <li id="navbar-logo"><a href="/"><img src="/images/gymhaan_logo_neu.png" alt="" /> Home</a></li>
        <div id="login-register">
          <li id="register"><a href="/register">Register</a></li>
          <li><a href="/login">Login</a></li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
