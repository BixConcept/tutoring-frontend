import { useContext, useState, Fragment } from "react";
import css from "../styles/findPage.module.scss";
import general from "../styles/general.module.scss";
import { OurContext } from "../OurContext";
import { subjects, topSubjects, TutoringOffer } from "../Models";
import Alert from "../Components/Alert";
import { API_HOST } from "../index";
import LoadingScreen from "../Components/LoadingScreen";

enum RequestState {
  NotAsked,
  Loading,
  Failure,
  Success,
}

const Find = (): JSX.Element => {
  document.title = "Nachhilfe finden";

  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const context = useContext(OurContext);

  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [results, setResults] = useState<TutoringOffer[]>([]);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.Loading
  );

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
    setRequestState(RequestState.Loading);
    fetch(`${API_HOST}/find`, {
      method: "POST",
      body: JSON.stringify({ subject, grade: parseInt(grade) }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) {
          setRequestState(RequestState.Failure);
          Alert("Irgendwas ist schief gegangen.", "error", context.theme);
        }
        return response.json();
      })
      .then((body) => {
        setRequestState(RequestState.Success);
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
      <div id={css.resultsContainer}>
        {requestState === RequestState.Success ? (
          <Fragment>
            <span id={css.numResults}>
              {results.length > 0
                ? `🎉 Es gibt ${results.length} Ergebnisse 🎉`
                : `Leider gibt es keine Ergebnisse 😔`}
            </span>
            {results.map((result, index) => (
              <div className={css.result} key={index}>
                <h2>
                  {result.name}, Stufe/Klasse {result.grade}
                </h2>
                <p className={css.email}>
                  <a href={`mailto:${result.email}`}>{result.email}</a>
                </p>
                <p>
                  {result.subject} bis Stufe/Klasse {result.max_grade}
                </p>
              </div>
            ))}
          </Fragment>
        ) : (
          <LoadingScreen loaded={requestState !== RequestState.Loading} />
        )}
      </div>
    </div>
  );
};

export default Find;
