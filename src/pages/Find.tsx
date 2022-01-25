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

  function validate() {
    if (subject === "") {
      alert(
        "Du musst ein Fach auswählen",
        "error",
        context.theme === "dark" || context.theme === "light"
          ? context.theme
          : "dark"
      );
    }
    if (grade === "") {
      alert(
        "Du musst eine Stufe auswählen",
        "error",
        context.theme === "dark" || context.theme === "light"
          ? context.theme
          : "dark"
      );
    }
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
      mockupData.filter(
        (offer) =>
          offer.subject === subject && toAbsGrade(offer) >= parseInt(grade)
      )
    );

    results.length > 0
      ? alert(
          `Insgesamt ${results.length} Lehrer gefunden 😊`,
          "success",
          context.theme === "dark" || context.theme === "light"
            ? context.theme
            : "dark"
        )
      : alert(
          "Es wurde kein Lehrer gefunden 🙁",
          "info",
          context.theme === "dark" || context.theme === "light"
            ? context.theme
            : "dark"
        );
  }

  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <h1>Nachhilfe finden</h1>
        <div className={css.inputfields}>
          <form
            onSubmit={(e) => {
              validate();

              alert(
                "Suche wird gestartet 🦄",
                "info",
                context.theme === "dark" || context.theme === "light"
                  ? context.theme
                  : "dark"
              );
              // Suche
              search();

              // TODO: add parameters to url so you can copy it

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
      <div id={css.resultsContainer}>
        <span>
          <strong>Name</strong>
        </span>
        <span>
          <strong>Stufe</strong>
        </span>
        <span>
          <strong>E-Mail</strong>
        </span>
        <span>
          <strong>Telefonnummer</strong>
        </span>
        <span>
          <strong>Sonstiges</strong>
        </span>
        {results.length > 0 ? (
          results.map((result) => (
            <Fragment>
              <span>{result.teacher.name}</span>
              <span>{result.teacher.grade}</span>
              <span>{result.teacher.email}</span>
              <span>{result.teacher.phoneNumber}</span>
              <span>{result.teacher.misc}</span>
            </Fragment>
          ))
        ) : (
          <h3>Leider gibt es gerade niemand passenden.</h3>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Find;
