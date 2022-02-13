import { useContext, useState } from "react";
import css from "../styles/findPage.module.scss";
import general from "../styles/general.module.scss";
import { OurContext } from "../OurContext";
import { subjects, topSubjects, TutoringOffer } from "../Models";
import Alert from "../Components/Alert";
import { API_HOST } from "../index";

const Find = (): JSX.Element => {
  document.title = "Nachhilfe finden";

  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const context = useContext(OurContext);

  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [results, setResults] = useState<TutoringOffer[]>([]);
  const [expandedResults, setExpandedResults] = useState<number[]>([]);

  const validate = (): boolean => {
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
  };

  const search = (): void => {
    console.log(JSON.stringify({ subject, grade: parseInt(grade) }));
    fetch(`${API_HOST}/find`, {
      method: "POST",
      body: JSON.stringify({ subject, grade: parseInt(grade) }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) {
          Alert("irgendwas ist schief gegangen.", "error", context.theme);
        }
        return response.json();
      })
      .then((body) => {
        setResults(body.content);
      });
  };

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
            <input
              type="submit"
              value="suchen 🚀"
              id={css.submit}
              disabled={!(grade && subject)}
            />
          </form>
        </div>
      </div>
      {results.length > 0 ? (
        <div id={css.resultsContainer}>
          <span id={css.numResults}>
            {results.length > 0
              ? `🎉 Es gibt ${results.length} Ergebnisse 🎉`
              : `Leider gibt es keine Ergebnisse 😔`}
          </span>
          {results.map((result, index) => (
            <div
              className={
                css.result +
                (expandedResults.indexOf(result.offer_id) > -1
                  ? ` ${css.expandedResult}`
                  : "")
              }
              key={index}
              onClick={() => {
                // if it is inside the list, remove it
                // NOTE: maybe this should be an object to have easier to read syntax
                console.log(expandedResults.indexOf(result.offer_id));
                if (expandedResults.indexOf(result.offer_id) > -1) {
                  setExpandedResults(
                    expandedResults.filter((x) => x != result.offer_id)
                  );
                } else {
                  setExpandedResults([...expandedResults, result.offer_id]);
                }

                console.log(expandedResults);
              }}
            >
              <h2>
                {result.name}, Stufe/Klasse {result.grade}
              </h2>
              <p className={css.email}>
                <a href={`mailto:${result.email}`}>{result.email}</a>
              </p>
              <p>
                {result.subject} bis Stufe/Klasse {result.max_grade}
              </p>
              {expandedResults.indexOf(result.offer_id) > -1 ? (
                <div className={css["result-expanded"]}></div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Find;
