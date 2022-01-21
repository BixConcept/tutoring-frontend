import css from "../styles/loginPage.module.scss";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../ThemeContext";

function LoginPage() {
  document.title = "Login";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pwType, setPwType] = useState("password");
  const changePwType = () => {
    if (pwType !== "password") setPwType("password");
    else setPwType("text");
  };

  function checkTheme(): Theme {
    // Irgendwie das Theme bekommen
    return "dark";
  }

  const toastId: any = useRef(null);

  const login = () => {
    // E-Mail überprüfen

    if (name) {
      if (name.includes("@") && name.split("@")[1] !== "gymhaan.de") {
        toast.error("Es sind nur gymhaan-E-Mails zugelassen", {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: checkTheme(),
          progress: undefined,
        });
        return;
      }
      if (
        name.split("@")[0] === "" ||
        !name.includes(".") ||
        !name.includes("@")
      ) {
        toast.error("Das ist keine valide E-Mail", {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: checkTheme(),
          progress: undefined,
        });
        return;
      }
    }

    // todo...
    console.log("login...");

    toastId.current = toast("Daten werden überprüft...", {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: checkTheme(),
      progress: undefined,
    });

    // Erstmal zum Testen
    let a = Math.floor(Math.random() * 10);
    if (a <= 5) {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        render: "Falsche Anmeldedaten",
      });
    } else {
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        render: "Erfolgreich angemeldet",
      });
    }
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
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
