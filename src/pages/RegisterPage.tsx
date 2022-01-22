import css from "../styles/registerPage.module.scss";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast, Theme } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";
import { log } from "console";

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

  function addSubject() {
    setAuswahl([...auswahl, { subject: fach, grade: stufe }]);
  }

  return (
    <div id={css.wrapper}>
      <div id={css.formContainer}>
        <h1>Registrieren als Nachhilfelehrer:in</h1>
        <div className={css.row}>
          <input type="text" name="id" id={css.id} placeholder="Schüler-ID" />
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
      </div>
    </div>
  );
}

export default RegisterPage;
