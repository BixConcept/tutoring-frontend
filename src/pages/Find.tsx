import { useContext, useState } from "react";
import css from "../styles/findPage.module.scss";
import general from "../styles/general.module.scss";
import { ThemeContext } from "../ThemeContext";
import { ToastContainer } from "react-toastify";
import { subjects, Teacher, topSubjects, TutoringOffer } from "../Models";
import Alert from "../Components/Alert";
import { API_HOST } from "../API_HOST";

function Find() {
  document.title = "Nachhilfe finden";

  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const context = useContext(ThemeContext);

  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [results, setResults] = useState<TutoringOffer[]>([]);

  function validate(): boolean {
    if (subject === "") {
      Alert(
        "Du musst ein Fach auswählen",
        "error",
        context.theme === "dark" || context.theme === "light"
          ? context.theme
          : "dark"
      );
      return false;
    }
    if (grade === "") {
      Alert(
        "Du musst eine Stufe auswählen",
        "error",
        context.theme === "dark" || context.theme === "light"
          ? context.theme
          : "dark"
      );
      return false;
    }
    return true;
  }

  function toAbsGrade(offer: TutoringOffer): number {
    if (offer.maxGrade >= 5) {
      return offer.maxGrade;
    }
    return offer.teacher.grade + offer.maxGrade;
  }

  function search() {
    fetch(`${API_HOST}/find?subject=${subject}&grade=${grade}`).then(
      (response) => {
        if (response.ok) {
          console.log(response);
        }
      }
    );
  }

  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <h1>Nachhilfe finden</h1>
        <div className={css.inputfields}>
          <form
            onSubmit={(e) => {
              if (validate()) {
                search();
              }
              e.preventDefault();
            }}
          >
            <div id={css.inputRow}>
              <div>
                <label htmlFor="subject">Fach auswählen</label>
                <div className={general.select_input_field}>
                  <select
                    name="subject"
                    id=""
                    className={general.select}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="">--- Fach wählen ---</option>
                    <option value="" disabled>
                      Beliebte Fächer
                    </option>
                    {topSubjects.map((subject, index) => {
                      return <option key={index}>{subject}</option>;
                    })}
                    <option value="" disabled>
                      Weitere Fächer
                    </option>
                    {subjects.sort().map((subject, index) => {
                      return <option key={index}>{subject}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="subject">Deine Stufe</label>
                <div className={general.select_input_field}>
                  <select
                    name=""
                    id=""
                    className={general.select}
                    onChange={(e) => setGrade(e.target.value)}
                  >
                    <option value="">--- Stufe wählen ---</option>
                    {grades.map((grade, index) => {
                      return <option key={index}>{grade}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <input type="submit" value="suchen 🚀" id={css.submit} />
          </form>
        </div>
      </div>
      {results.length > 0 ? (
        <div id={css.resultsContainer}>
          <span id={css.numResults}>
            🎉 Es gibt {results.length} Ergebnisse
          </span>
          {results.map((result, index) => (
            <div className={css.result} key={index}>
              <h2>
                {result.teacher.name}, Stufe/Klasse {result.teacher.grade}
              </h2>
              {result.teacher.misc !== undefined ? (
                <p>{result.teacher.misc}</p>
              ) : null}
              <p className={css.email}>
                <a href={`mailto:${result.teacher.email}`}>
                  {result.teacher.email}
                </a>
              </p>
              <p>
                {result.subject} bis Stufe/Klasse {toAbsGrade(result)}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
}

export default Find;
