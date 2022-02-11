import css from "../styles/loginPage.module.scss";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OurContext } from "../OurContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

import { API_HOST } from "../index";
import Alert from "../Components/Alert";

// a red asterisk *
const Required = (): JSX.Element => {
  return <span className={css.required}></span>;
};

const LoginPage = (): JSX.Element => {
  document.title = "Login";
  const [email, setEmail] = useState<string>("");
  const [otpEmail, setOtpEmai] = useState<string>("");
  const [password, setPassword] = useState("");
  const [pwType, setPwType] = useState("password");
  const changePwType = () => {
    if (pwType !== "password") setPwType("password");
    else setPwType("text");
  };

  const navigate = useNavigate();
  const context = useContext(OurContext);
  const toastId: any = useRef(null);

  function checkTheme(): "dark" | "light" {
    console.log(context.theme);
    if (context.theme === "dark" || context.theme === "light") {
      return context.theme;
    } else {
      return "dark";
    }
  }

  const login = () => {
    if (email) {
      if (email.includes("@") && email.split("@")[1] !== "gymhaan.de") {
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
        email.split("@")[0] === "" ||
        !email.includes(".") ||
        !email.includes("@")
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

    toastId.current = toast("Daten werden überprüft...", {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: checkTheme(),
      progress: undefined,
    });

    fetch(API_HOST + "/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: email, password }),
    }).then((res) => console.log(res));

    navigate("/dashboard", { replace: true });
  };

  function loginOTP() {
    fetch(`${API_HOST}/user/otp`, {
      method: "POST",
      body: JSON.stringify({ email: otpEmail }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          Alert("E-Mail geschickt!", "success", checkTheme());
        } else {
          Alert(
            "Wahrscheinlich stimmt mit deinem Input was nicht.",
            "error",
            checkTheme()
          );
        }
        return res.json();
      })
      .then((body) => console.log(body));
  }

  return (
    <div id={css.login}>
      <h1>Login</h1>
      <h3>Anmelden mit Link per E-Mail</h3>
      <div className={css["inputFields"]}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginOTP();
          }}
        >
          <label htmlFor="email">
            E-Mail Adresse
            <Required />
          </label>
          <div className={css.inputField}>
            <input
              type="email"
              name="email"
              required
              placeholder="E-Mail"
              value={otpEmail}
              onChange={(e) => setOtpEmai(e.target.value)}
            />
          </div>
          <input type="submit" value="Login (ohne Passwort)" id={css.submit} />
        </form>
      </div>

      <h3>E-Mail/Passwort (deaktiviert)</h3>
      <div className={css["inputFields"]}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // login();
          }}
        >
          <label htmlFor="email">
            E-Mail Adresse
            <Required />
          </label>
          <div className={css.inputField}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Name"
              required
              disabled
            />
          </div>

          <label htmlFor="password">
            Passwort
            <Required />
          </label>
          <div className={css.passwordField}>
            <input
              type={pwType}
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder="Passwort"
              required
              disabled
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
          <input
            type="submit"
            value="Login (mit Passwort)"
            id={css.submit}
            disabled
          />
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
