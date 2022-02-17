import { useContext, useState, Fragment, useEffect } from "react";
import css from "../styles/findPage.module.scss";
import general from "../styles/general.module.scss";
import { OurContext } from "../OurContext";

import { Subject, topSubjects, TutoringOffer } from "../Models";
import Alert from "../Components/Alert";
import { API_HOST } from "../index";
import LoadingScreen from "../Components/LoadingScreen";
import { RequestState } from "../Models";

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
  const [clickCount, setClickCount] = useState<number>(0);
  const [subjectsRequestState, setSubjectsRequestState] =
    useState<RequestState>(RequestState.Loading);

  const handleClick = () => {
    console.log(clickCount);
    setClickCount(clickCount + 1);
    if (clickCount === 10) {
      Alert(
        window.atob("V0lSIEJBVUVOIERJRSBTS1lCQVNFRUUK"),
        "success",
        context.theme
      );
      subjects.push({ id: 187, name: "Fortnite" });
    }
  };

  useEffect(() => {
    setSubjectsRequestState(RequestState.Loading);
    fetch(`${API_HOST}/subjects`)
      .then((res: Response) => {
        if (!res.ok) {
          console.log(res);
          throw new Error();
        }
        return res.json();
      })
      .then((body: any) => {
        setSubjectsRequestState(RequestState.Success);
        if (body.content) {
          console.log(body.content);
          setSubjects(body.content);
        }
      })
      .catch((e) => {
        setSubjectsRequestState(RequestState.Failure);
        Alert("Irgendwas ist schiefgegangen", "error", context.theme);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validate = (): boolean => {
    if (isNaN(subject)) {
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
        <h1
          onClick={() => {
            handleClick();
          }}
        >
          Nachhilfe finden
        </h1>
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
            {results.map((result, index) => (
              <div className={css.result} key={index}>
                <h2>
                  {result.name}, Stufe/Klasse {result.grade}
                </h2>
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
