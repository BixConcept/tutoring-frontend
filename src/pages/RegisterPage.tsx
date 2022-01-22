import css from "../styles/registerPage.module.scss";
import { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../ThemeContext";

function RegisterPage() {
  document.title = "Registrieren";
  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];

  const subjects = [
    "Deutsch",
    "Englisch",
    "Katholische Religion",
    "Evangelische Religion",
    "Mathematik",
    "Philosophie",
    "Latein",
    "Altgriechisch",
    "Hebräisch",
    "Physik",
    "Biologie",
    "Chemie",
    "Französisch",
    "Spanisch",
    "Pädagogik",
    "Sozialwissenschaften",
    "Politik/Wirtschaft",
    "Informatik",
  ];

  const [auswahl, setAuswahl] = useState([{}]);
  const [fach, setFach] = useState("");
  const [stufe, setStufe] = useState("");

  const [id, setId] = useState("");

  function addSubject() {
    setAuswahl([...auswahl, { subject: fach, grade: stufe }]);
  }

  const context = useContext(ThemeContext);

  function checkTheme(): "dark" | "light" {
    // to have type safety
    if (context.theme === "dark" || context.theme === "light") {
      return context.theme;
    } else {
      return "dark";
    }
  }

  function register() {
    // todo
    console.log(id, auswahl);

    if (/^-?[\d.]+(?:e-?\d+)?$/.test(id) && auswahl.length > 1) {
      toast.success("User wird erstellt...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: checkTheme(),
        progress: undefined,
      });
    } else {
      toast.error("Ungültige Daten", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: checkTheme(),
        progress: undefined,
      });
    }
  }

  return (
    <div id={css.wrapper}>
      <div id={css.formContainer}>
        <h1>Registrieren als Nachhilfelehrer:in</h1>
        <div className={css.row}>
          <input
            type="text"
            name="id"
            id={css.id}
            placeholder="Schüler-ID"
            autoComplete="off"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <form
          className={css.subjects}
          onSubmit={(e) => {
            addSubject();
            e.preventDefault();
          }}
        >
          <select
            name=""
            id=""
            onChange={(e) => {
              setFach(e.target.value);
            }}
          >
            <option value={""}>--- Fach hinzufügen ---</option>
            {subjects.sort().map((subject, index) => {
              return <option key={index}>{subject}</option>;
            })}
          </select>
          <select
            name=""
            id=""
            onChange={(e) => {
              setStufe(e.target.value);
            }}
          >
            <option value="">--- Stufe auswählen ---</option>
            {grades.map((grade, index) => {
              return <option key={index}>{grade}</option>;
            })}
          </select>
          <input type="submit" value={"Hinzufügen"} />
        </form>
        <div className={css.auswahl}>
          {auswahl.map((f, index) => {
            return <p key={index}>{JSON.stringify(f)}</p>;
          })}
        </div>
        <button
          type="submit"
          onClick={(e) => {
            register();
            e.preventDefault();
          }}
        >
          User erstellen
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;
