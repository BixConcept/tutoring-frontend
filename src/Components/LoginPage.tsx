import "../styles/Loginpage.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pwType, setPwType] = useState("password");

  const changePwType = () => {
    if (pwType != "password") setPwType("password");
    else setPwType("text");
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <div className="input-fields">
        <div className="input-field">
          <input
            type="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>

        <div className="password-field">
          <input
            type={pwType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            required
          />
          <button
            className="password-eye"
            onClick={(e) => {
              e.preventDefault();
              changePwType();
            }}
          >
            <FontAwesomeIcon icon={pwType == "password" ? faEye : faEyeSlash} />
          </button>
        </div>

        <input type="submit" value="Login" id="submit" />
      </div>
    </div>
  );
}

export default LoginPage;
