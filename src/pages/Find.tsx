import { Fragment, useContext, useState } from "react";
import css from "../styles/findPage.module.scss";
import { ThemeContext } from "../ThemeContext";
import { toast, ToastContainer } from "react-toastify";
import { Teacher, TutoringOffer } from "../Models";
import alert from "../Components/Alert";

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

  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [results, setResults] = useState<TutoringOffer[]>([]);

  function validate(): boolean {
    if (subject === "") {
      alert(
        "Du musst ein Fach auswählen",
        "error",
        context.theme === "dark" || context.theme === "light"
          ? context.theme
          : "dark"
      );
      return false;
    }
    if (grade === "") {
      alert(
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

  const mockupData: TutoringOffer[] = [
    {
      id: 1,
      teacher: {
        id: 1,
        name: "Niels Schlegel",
        email: "niels.schlegel@gymhaan.de",
        grade: 11,
      },
      subject: "Mathematik",
      maxGrade: -1,
    },
    {
      id: 2,
      teacher: {
        id: 1,
        name: "Niels Schlegel",
        email: "niels.schlegel@gymhaan.de",
        grade: 11,
      },
      subject: "Informatik",
      maxGrade: -1,
    },
    {
      id: 3,
      teacher: {
        id: 1,
        name: "Niels Schlegel",
        email: "niels.schlegel@gymhaan.de",
        grade: 11,
        misc: "Coole Socke",
      },
      subject: "Englisch",
      maxGrade: -1,
    },
    {
      id: 4,
      teacher: {
        id: 2,
        name: "Jemand Anderes",
        email: "jemand.anderes@gymhaan.de",
        grade: 9,
      },
      subject: "Latein",
      maxGrade: 8,
    },
  ];

  function toAbsGrade(offer: TutoringOffer): number {
    if (offer.maxGrade >= 5) {
      return offer.maxGrade;
    }
    return offer.teacher.grade + offer.maxGrade;
  }

  function search() {
    // TODO: API request

    setResults(
      mockupData
      // mockupData.filter(
      //   (offer) =>
      //     offer.subject === subject && toAbsGrade(offer) >= parseInt(grade)
      // )
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

                // TODO: add parameters to url so you can copy it
              }
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
                    onChange={(e) => setSubject(e.target.value)}
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
            🎉 Es gibt {results.length} mögliche Lehrer:innen
          </span>
          {results.map((result) => (
            <div className={css.result}>
              <h2>{result.teacher.name}</h2>
              {result.teacher.misc !== undefined ? (
                <p>{result.teacher.misc}</p>
              ) : null}
              <p className={css.email}>{result.teacher.email}</p>
              <p>
                {result.subject} bis Stufe {toAbsGrade(result)}
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
