import { useContext, useState } from "react";
import css from "../styles/findPage.module.scss";
import { ThemeContext } from "../ThemeContext";
import grades from "../pages/RegisterPage";

function Find() {
  document.title = "Nachhilfe finden";

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
  ].sort();

  const context = useContext(ThemeContext);

  function checkTheme(): "dark" | "light" {
    // to have type safety
    if (context.theme === "dark" || context.theme === "light") {
      return context.theme;
    } else {
      return "dark";
    }
  }

  const [stufe, setStufe] = useState("");
  const [fach, setFach] = useState("");

  return (
    <div className={css.container}>
      <h1>Nachhilfe finden</h1>
      <div className={css.inputfields}>
        <form
          onSubmit={(e) => {
            // Suche
            e.preventDefault();
          }}
        >
          <div id={css.inputRow}>
            <div>
              <label htmlFor="subject">Fach auswählen</label>
              <div className={css.inputField}>
                <select
                  name="subject"
                  id=""
                  onChange={(e) => setFach(e.target.value)}
                >
                  <option value="">--- Fach wählen ---</option>
                  {subjects.sort().map((subject, index) => {
                    return <option key={index}>{subject}</option>;
                  })}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="subject">Deine Stufe</label>
              <div className={css.inputField}>
                <select
                  name=""
                  id=""
                  onChange={(e) => setStufe(e.target.value)}
                >
                  <option value="">--- Stufe wählen ---</option>
                  {grades.map((grade, index) => {
                    return <option key={index}>{grade}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
          <input type="submit" value="weiter" id={css.submit} />
        </form>
      </div>
    </div>
  );
}

export default Find;
