import css from "../styles/loginPage.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  document.title = "Login";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pwType, setPwType] = useState("password");

  const changePwType = () => {
    if (pwType !== "password") setPwType("password");
    else setPwType("text");
  };

  const login = () => {
    // todo...
    console.log("login...");
  };

  return (
    <div id={css.login}>
      <h1>Login</h1>
      <div className={css["inputFields"]}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div className={css.inputField}>
            <input
              type="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>

          <div className={css.passwordField}>
            <input
              type={pwType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder="Passwort"
              required
            />

            <button
              className={css.passwordEye}
              onClick={(e) => {
                e.preventDefault();
                changePwType();
              }}
            >
              <FontAwesomeIcon
                icon={pwType === "password" ? faEye : faEyeSlash}
              />
            </button>
          </div>
          <input type="submit" value="Login" id={css.submit} />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
