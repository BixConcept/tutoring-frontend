<<<<<<< HEAD
import css from "../styles/loginPage.module.scss";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

function RegisterPage() {
  document.title = "Register";

  // Daten eines User
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [pwType, setPwType] = useState("password");
  const changePwType = () => {
    if (pwType !== "password") setPwType("password");
    else setPwType("text");
  };

  const context = useContext(ThemeContext);
  const toastId: any = useRef(null);

  function checkTheme(): "dark" | "light" {
    if (context.theme === "dark" || context.theme === "light") {
      return context.theme;
    } else {
      return "dark";
    }
  }

  const register = () => {
    // Überprüfungen
    if (password.length <= 5) {
      toast.error("Dein Passwort muss mindestens aus 5 Zeichen bestehen", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: checkTheme(),
        progress: undefined,
      });
      return;
    }

    toast.success("User wurde erfolgreich erstellt 🦄", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: checkTheme(),
      progress: undefined,
    });
  };

  return (
    <div id={css.login}>
      <h1>Registrieren</h1>
      <div className={css["inputFields"]}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <div className={css.inputField}>
            <input
              type="username"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Schüler-ID"
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

          <input type="submit" value="Registrieren" id={css.submit} />
          <ToastContainer />
=======
import css from "../styles/registerPage.module.scss";

function RegisterPage() {
  const grades = ["5", "6", "7", "8", "9", "EF", "Q1", "Q2"];

  const subjects = [
    "Deutsch",
    "Englisch",
    "katholische Religion",
    "evangelische Religion",
    "Mathematik",
    "Philosophie",
    "Latein",
    "Altgriechisch",
    "Physik",
    "Biologie",
    "Chemie",
    "Spanisch",
    "Französisch",
    "Spanisch",
    "Pädagogik",
    "Sozialwissenschaften",
    "Politik/Wirtschaft",
    "Informatik",
  ];

  return (
    <div id={css.wrapper}>
      <div id={css.formContainer}>
        <h1>Regristrieren als Nachhilfelehrer:in</h1>
        <form>
          <div className={css.row}>
          <input
            type="text"
            name="firstName"
            id={css.firstName}
            placeholder="Vorname"
          />
          <input
            type="text"
            name="lastName"
            id={css.lastName}
            placeholder="Nachname"
          />
          </div>
          <select name="grade" id="grade">
            <option value="">--- Bitte auswählen ---</option>
            {grades.map((grade) => {
              return <option value={grade}>{grade}</option>;
            })}
          </select>
          <div className={css.subjectOptions}>
            {subjects.map((subject) => {
              return (
                <div>
                  <input type="checkbox" name="" id="" />
                  <p>{subject}</p>
                  <select name="" id="">
                    <option value="">--- Bitte auswählen ---</option>
                    {grades.map((grade) => {
                      return <option value={grade}>{grade}</option>;
                    })}
                  </select>
                </div>
              );
            })}
          </div>
>>>>>>> 9497aa5e483e83f48a41396cf7f8be43dfac190d
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
