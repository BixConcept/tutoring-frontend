import { API_HOST, checkEmail } from "../index";
import { Fragment, useContext, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request, Subject, TutoringOffer, User, topSubjects } from "../Models";
import { RequestState, Stats } from "../Models";

import Alert from "../Components/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen";
import { MessengerInfo } from "../Components/MessengerInfo";
import { OurContext } from "../OurContext";
import { Statistic } from "../Components/Statistic";
import css from "../styles/findPage.module.scss";
import general from "../styles/general.module.scss";

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
      headers: {
        "Content-Type": "application/json",

        "X-Frontend-Path": document.location.pathname,
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        Alert(
          "Erfolgreich auf die Benachrichtigungsliste hinzugefügt!",
          "success",
          context.theme
        );
      } else {
        Alert("Irgendetwas ist schiefgelaufen.", "error", context.theme);
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

type SortMethod =
  | "random"
  | "registrationdateAsc"
  | "registrationdateDesc"
  | "proficiencyDesc"
  | "ageDesc"
  | "ageAsc";

const Find = (): JSX.Element => {
  document.title = "Nachhilfe finden";

  const urlParams = useParams();

  const grades = Array.from({ length: 9 }, (_: number, __: number) => __ - -5);
  const context = useContext(OurContext);

  const [grade, setGrade] = useState(urlParams.grade || "");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState<number>(
    parseInt(urlParams.subject || "")
  );
  const [results, setResults] = useState<TutoringOffer[]>([]);
  const [offersRequestState, setOffersRequestState] = useState<RequestState>(
    RequestState.NotAsked
  );

  const [offerSortMethod, setOfferSortMethod] = useState<SortMethod>("random");
  const [subjectsRequestState, setSubjectsRequestState] =
    useState<RequestState>(RequestState.Loading);
  const [userRequestState, setUserRequestState] = useState<RequestState>(
    RequestState.Loading
  );
  const [statsRequest, setStatsRequests] = useState<Request<Stats>>({
    state: RequestState.Loading,
    data: null,
  });
  const [email, setEmail] = useState<string>("");
  const [userGradeS, setUserGradeS] = useState<string>("");
  const [emailIsDuplicate, setEmailIsDuplicate] = useState<boolean>(false);
  const [registrationState, setRegistrationState] = useState<RequestState>(
    RequestState.NotAsked
  );

  useEffect(() => {
    setSubjectsRequestState(RequestState.Loading);
    fetch(`${API_HOST}/subjects`, {
      headers: { "X-Frontend-Path": document.location.pathname },
    })
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
        Alert("Irgendetwas ist schiefgegangen", "error", context.theme);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch(`${API_HOST}/user`, {
      credentials: "include",
      headers: { "X-Frontend-Path": document.location.pathname },
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error((await res.json()).msg);
        }
      })
      .then((body) => {
        // slow loading down so the loading screen is visible and not just flashing
        // NOTE: this could be deleted and is just there for aesthetic purposes
        setTimeout(() => {
          setUserRequestState(RequestState.Success);
        }, 300);
        context.setUser(body.content || null);
      })
      .catch((e) => {
        // slow loading down so the loading screen is visible and not just flashing
        // NOTE: this could be deleted and is just there for aesthetic purposes
        setTimeout(() => {
          setUserRequestState(RequestState.Failure);
        }, 300);
        context.setUser(null);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch(`${API_HOST}/stats`, {
          headers: { "X-Frontend-Path": document.location.pathname },
        });
        let body = await res.json();
        if (!res.ok) {
        } else {
          setStatsRequests({ state: RequestState.Success, data: body.content });
        }
      } catch (e: any) {
        setStatsRequests({ state: RequestState.Failure, data: null });
        Alert(
          "Irgendwas ist schief gegangen - das ist ein Server-Fehler",
          "error",
          context.theme
        );
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (subject && grade) {
      navigate(`/find/${subject}/${grade}`);
    }
  }, [grade, subject]);

  useEffect(() => {
    const urlGrade = urlParams.grade || "";
    const urlSubject = parseInt(urlParams.subject || "");

    if (!(parseInt(urlGrade) && urlSubject >= 5 && urlSubject <= 13)) {
      setGrade("");
      setSubject(NaN);
      navigate("/find");
      return;
    }

    setGrade(urlGrade);
    setSubject(urlSubject);
    search();
  }, [subjects]);

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
    setOffersRequestState(RequestState.Loading);
    fetch(`${API_HOST}/find`, {
      method: "POST",
      body: JSON.stringify({ subjectId: subject, grade: parseInt(grade) }),
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Path": document.location.pathname,
      },
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          setOffersRequestState(RequestState.Failure);
          Alert("Irgendetwas ist schief gegangen.", "error", context.theme);
        }
        return response.json();
      })
      .then((body) => {
        setOffersRequestState(RequestState.Success);
        setResults(body.content);
      });
  };

  function subjectIdFromName(name: string): number {
    let matching = subjects.filter((x) => x.name === name);
    if (matching.length === 0) return NaN;
    return matching[0].id;
  }

  function subjectNameFromId(id: number): string | null {
    let matching = subjects.filter((x) => x.id === id);
    if (matching.length === 0) return null;
    return matching[0].name;
  }

  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        {userRequestState === RequestState.Loading ? (
          <LoadingScreen loaded={false} />
        ) : context.user ? (
          <Fragment>
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
                        value={subjectNameFromId(subject) || undefined}
                        className={general.select}
                        onChange={(e) => {
                          console.log(e.target.value);
                          console.log(
                            subjectIdFromName(e.target.value),
                            subjects[subjectIdFromName(e.target.value)]
                          );
                          if (!isNaN(subjectIdFromName(e.target.value))) {
                            setSubject(subjectIdFromName(e.target.value));
                            setOffersRequestState(RequestState.NotAsked); // so it doesn't show that there are no offers before actually loading them
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
                            return (
                              <option key={subject.id}>{subject.name}</option>
                            );
                          })}
                        <option value="" disabled>
                          Weitere Fächer
                        </option>
                        {subjects
                          .sort()
                          .filter((x) => topSubjects.indexOf(x.name) === -1)
                          .map((subject, index) => {
                            return (
                              <option key={subject.id}>{subject.name}</option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject">Deine Stufe</label>
                    <div className={general.select_input_field}>
                      <select
                        value={grade}
                        name=""
                        id=""
                        className={general.select}
                        onChange={(e) => {
                          setGrade(e.target.value);
                          setOffersRequestState(RequestState.NotAsked); // so it doesn't show that there are no offers before actually loading them
                        }}
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
          </Fragment>
        ) : registrationState === RequestState.NotAsked ? (
          <Fragment>
            <h1>Registrieren</h1>
            <p>
              Um die Daten unserer Nutzer:innen zu schützen, müssen wir
              verifizieren, dass du eine echte Person bist.
            </p>
            <p>
              Gib dafür deine Schul-E-Mail-Adresse an, über die wir dir einen
              Verifizierungscode zukommen lassen können.
            </p>
            <div id={css.stats}>
              <Statistic
                text="angebote"
                value={(statsRequest.data || {}).offers}
              />
              <Statistic text="leute" value={(statsRequest.data || {}).users} />
            </div>
            {emailIsDuplicate ? (
              <p style={{ color: "#e74c3c" }}>
                Diese E-Mail wird schon verwendet!
              </p>
            ) : null}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRegistrationState(RequestState.Loading);
                fetch(`${API_HOST}/user/register`, {
                  credentials: "include",
                  headers: {
                    "content-type": "application/json",
                    "X-Frontend-Path": document.location.pathname,
                  },
                  method: "POST",
                  body: JSON.stringify({
                    email,
                    grade: parseInt(userGradeS),
                    intent: "/find", // to redirect the user to /find instead of the dashboard
                  }),
                }).then(async (res) => {
                  let body;
                  try {
                    body = await res.json();
                  } catch (e: any) {
                    if (!res.ok) {
                      Alert(
                        `Irgendwas ist schiefgelaufen: ${res.status}`,
                        "error",
                        context.theme
                      );
                    } else {
                    }
                  }
                  setRegistrationState(
                    res.ok ? RequestState.Success : RequestState.Failure
                  );
                  if (!res.ok) {
                    Alert(
                      `Irgendwas ist schiefgelaufen (${res.status}): '${body.msg}'`,
                      "error",
                      context.theme
                    );
                  }
                });
              }}
              id={css.registerForm}
            >
              <div>
                <label htmlFor="grade">E-Mail-Adresse</label>
                <input
                  type="email"
                  name="email"
                  className={general["input-field"]}
                  placeholder="john.doe@gymhaan.de"
                  value={email}
                  onChange={(e) => {
                    let trimmed = e.target.value.trim();
                    setEmail(trimmed);
                    fetch(`${API_HOST}/user/email-available/${trimmed}`, {
                      headers: {
                        "X-Frontend-Path": document.location.pathname,
                      },
                    }).then(async (res) => {
                      let body;
                      try {
                        body = await res.json();
                      } catch (e: any) {
                        if (res.status !== 409 && res.status !== 404) {
                          Alert(
                            `Fehler: ${res.status} - ${res.statusText}`,
                            "error",
                            context.theme
                          );
                        }
                      }

                      switch (res.status) {
                        case 409:
                          setEmailIsDuplicate(true);
                          break;

                        case 200:
                          setEmailIsDuplicate(false);
                          break;

                        // if no parameter is specified, the path is /user/email-available/ with no parameter, which doesn't exist
                        case 404:
                          setEmailIsDuplicate(false);
                          break;

                        default:
                          break;
                      }
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="grade">Stufe</label>
                <input
                  type="number"
                  min="5"
                  max="13"
                  name="grade"
                  className={general["input-field"]}
                  placeholder="11"
                  value={userGradeS}
                  onChange={(e) => setUserGradeS(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Registrieren"
                  className={general.text_button}
                  disabled={
                    !email ||
                    !userGradeS ||
                    parseInt(userGradeS) < 5 ||
                    parseInt(userGradeS) > 13 ||
                    emailIsDuplicate ||
                    !email.endsWith("@gymhaan.de")
                  }
                />
              </div>
            </form>
          </Fragment>
        ) : registrationState === RequestState.Success ? (
          <Fragment>
            <h1>Registrierung erfolgreich!</h1>
            <p>
              Wir haben dir eine E-Mail an deine Schul-Mailbox{" "}
              <a href="https://outlook.office365.com/mail/">bei Outlook</a>{" "}
              geschickt.
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <h1>Fehler</h1>
            <p>Bei der Registrierung ist etwas schiefgegangen</p>
            <Link to={"/"} className={general.text_button}>
              Zurück
            </Link>
          </Fragment>
        )}
      </div>
      <div id={css.resultsContainer}>
        {offersRequestState === RequestState.Success ? (
          <Fragment>
            <div id={css.textAndSort}>
              <span id={css.numResults}>
                {results.length > 0
                  ? `🎉 Es gibt ${results.length} ${
                      results.length > 1 ? "Ergebnisse" : "Ergebnis"
                    } 🎉`
                  : `Leider gibt es keine Ergebnisse 😔`}
              </span>
              <div id={css.sortMethod}>
                <div className={general.select_input_field}>
                  <select
                    className={general.select}
                    onChange={(e) =>
                      setOfferSortMethod(e.target.value as SortMethod)
                    }
                  >
                    <option value="random">Zufällig sortieren</option>
                    <option value="proficiencyDesc">
                      Erfahrung (absteigend)
                    </option>
                    <option value="ageAsc">Alter (aufsteigend)</option>
                    <option value="ageDesc">Alter (absteigend)</option>
                  </select>
                </div>
              </div>
            </div>
            {results.length === 0 ? (
              <RequestForm
                grade={parseInt(grade)}
                subject={subject}
                subjects={subjects}
              />
            ) : null}
            <Fragment>
              {results
                .sort((a: TutoringOffer, b: TutoringOffer): number => {
                  switch (offerSortMethod) {
                    case "ageDesc":
                      return b.grade - a.grade;
                    case "ageAsc":
                      return a.grade - b.grade;
                    case "proficiencyDesc":
                      return b.maxGrade - a.maxGrade;
                    default:
                      return Math.random() - 0.5;
                  }
                })
                .map((result, index) => (
                  <div className={css.result} key={index}>
                    <h2>
                      <Link to={`/user/${result.userId}`}>{result.name}</Link>,
                      Stufe {result.grade}
                    </h2>
                    <p>{result.misc}</p>
                    <p className={css.email}>
                      <a href={`mailto:${result.email}`}>
                        E-Mail: {result.email}
                      </a>
                    </p>
                    <p>
                      {result.subjectName} bis Stufe {result.maxGrade}
                    </p>
                    <div className={css.messengers}>
                      <MessengerInfo
                        hasDiscord={result.hasDiscord}
                        discordUser={result.discordUser}
                        hasSignal={result.hasSignal}
                        hasWhatsapp={result.hasWhatsapp}
                        phoneNumber={result.phoneNumber}
                      />
                    </div>
                  </div>
                ))}
            </Fragment>
          </Fragment>
        ) : (
          <LoadingScreen loaded={offersRequestState !== RequestState.Loading} />
        )}
        <LoadingScreen loaded={subjectsRequestState !== RequestState.Loading} />
      </div>
    </div>
  );
};

export default Find;
