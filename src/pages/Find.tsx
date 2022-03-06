import { useContext, useState, Fragment, useEffect } from "react";
import css from "../styles/findPage.module.scss";
import general from "../styles/general.module.scss";
import { OurContext } from "../OurContext";

import { Subject, topSubjects, TutoringOffer } from "../Models";
import Alert from "../Components/Alert";
import { API_HOST, checkEmail } from "../index";
import LoadingScreen from "../Components/LoadingScreen";
import { RequestState } from "../Models";
import { Link } from "react-router-dom";

function RequestForm(props: {
  subject: number;
  grade: number;
  subjects: Subject[];
}) {
  const [email, setEmail] = useState("");
  const context = useContext(OurContext);

  function request() {
    fetch(`${API_HOST}/request`, {
      method: "POST",
      body: JSON.stringify({
        email,
        grade: props.grade,
        subject: props.subject,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        Alert(
          "Erfolgreich auf die Benachrichtigungsliste hinzugefügt!",
          "success",
          context.theme
        );
      } else {
        Alert("Irgendwas ist schiefgelaufen.", "error", context.theme);
      }
    });
  }

  return (
    <div id={css["request-form"]}>
      <h3>
        Per E-Mail benachrichten lassen, wenn jemand anfängt{" "}
        <span className={general["text_marker"]}>
          {props.subjects.filter((x) => x.id === props.subject)[0].name}
        </span>{" "}
        für <span className={general["text_marker"]}>Stufe {props.grade}</span>
        anzubieten?
      </h3>
      <p>
        Sobald sich jemand registriert, um Nachhilfe für das betreffende Fach zu
        geben, wirst du per E-Mail an die angegebene Adresse benachrichtigt.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          request();
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          className={general["input-field"]}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="submit"
          value="Bestätigen"
          className={general.text_button}
          disabled={!checkEmail(email)}
        />
      </form>
    </div>
  );
}

const Find = (): JSX.Element => {
  document.title = "Nachhilfe finden";

  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const context = useContext(OurContext);

  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState<number>(NaN);
  const [results, setResults] = useState<TutoringOffer[]>([]);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.NotAsked
  );
  const [subjectsRequestState, setSubjectsRequestState] =
    useState<RequestState>(RequestState.Loading);

  useEffect(() => {
    setSubjectsRequestState(RequestState.Loading);
    fetch(`${API_HOST}/subjects`)
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((body: any) => {
        setSubjectsRequestState(RequestState.Success);
        if (body.content) {
          setSubjects(body.content);
        }
      })
      .catch(() => {
        setSubjectsRequestState(RequestState.Failure);
        Alert("Irgendwas ist schiefgegangen", "error", context.theme);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validate = (): boolean => {
    if (isNaN(subject)) {
      Alert("Du musst ein Fach auswählen", "error", context.theme);
      return false;
    }
    if (grade === "") {
      Alert("Du musst eine Stufe auswählen", "error", context.theme);
      return false;
    }
    return true;
  };

  const search = (): void => {
    setRequestState(RequestState.Loading);
    fetch(`${API_HOST}/find`, {
      method: "POST",
      body: JSON.stringify({ subjectId: subject, grade: parseInt(grade) }),
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

  function subjectIdFromName(name: string): number {
    let matching = subjects.filter((x) => x.name === name);
    if (matching.length === 0) return NaN;
    return matching[0].id;
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
                    onChange={(e) => {
                      if (!isNaN(subjectIdFromName(e.target.value))) {
                        setSubject(subjectIdFromName(e.target.value));
                      }
                    }}
                  >
                    <option value="">--- Fach wählen ---</option>
                    <option value="" disabled>
                      Beliebte Fächer
                    </option>
                    {subjects
                      .filter((x) => topSubjects.indexOf(x.name) !== -1)
                      .map((subject, index) => {
                        return <option key={index}>{subject.name}</option>;
                      })}
                    <option value="" disabled>
                      Weitere Fächer
                    </option>
                    {subjects
                      .sort()
                      .filter((x) => topSubjects.indexOf(x.name) === -1)
                      .map((subject, index) => {
                        return <option key={index}>{subject.name}</option>;
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
                ? `🎉 Es gibt ${results.length} ${
                    results.length > 1 ? "Ergebnisse" : "Ergebnis"
                  } 🎉`
                : `Leider gibt es keine Ergebnisse 😔`}
            </span>
            {results.length === 0 ? (
              <RequestForm
                grade={parseInt(grade)}
                subject={subject}
                subjects={subjects}
              />
            ) : null}
            {results.map((result, index) => (
              <div className={css.result} key={index}>
                <h2>
                  <Link to={`/user/${result.userId}`}>{result.name}</Link>,
                  Stufe/Klasse {result.grade}
                </h2>
                <p>{result.misc}</p>
                <p className={css.email}>
                  <a href={`mailto:${result.email}`}>{result.email}</a>
                </p>
                <p>
                  {result.subjectName} bis Stufe/Klasse {result.maxGrade}
                </p>
              </div>
            ))}
          </Fragment>
        ) : (
          <LoadingScreen loaded={requestState !== RequestState.Loading} />
        )}
        <LoadingScreen loaded={subjectsRequestState !== RequestState.Loading} />
      </div>
    </div>
  );
};

export default Find;
