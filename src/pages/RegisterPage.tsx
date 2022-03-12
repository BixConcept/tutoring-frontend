import { useState, useContext, useRef, useEffect, Fragment } from "react";
import { OurContext } from "../OurContext";
import lottie from "lottie-web";
import css from "../styles/registerPage.module.scss";
import general from "../styles/general.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router";
import { RequestState, Subject, topSubjects } from "../Models";
import Alert from "../Components/Alert";
import { API_HOST } from "../index";
import LoadingScreen from "../Components/LoadingScreen";

const RegisterPage = (): JSX.Element => {
  document.title = "Registrieren";
  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];

  const [email, setEmail] = useState("");
  const [chosen, setChosen] = useState<{
    [key: number]: string;
  }>({});
  const [grade, setGrade] = useState("");
  const [misc, setMisc] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.NotAsked
  );
  const [clickCount, setClickCount] = useState<number>(0);

  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const navigate = useNavigate();
  const { stepIndex } = useParams();

  const [step, setStep] = useState(1);

  const location = useLocation();
  const context = useContext(OurContext);

  useEffect(() => {
    setRequestState(RequestState.Loading);
    if (!stepIndex) {
      navigate("/register/1", {
        replace: true,
      });
    } else {
      let parsedIndex = parseInt(stepIndex);
      if (isNaN(parsedIndex) || !email) {
        navigate("/register/1", {
          replace: true,
        });
      } else {
        setStep(parsedIndex);

        fetch(`${API_HOST}/subjects`)
          .then((res) => {
            if (!res.ok) {
              throw new Error();
            }
            return res.json();
          })
          .then((body) => {
            if (body.content) {
              setRequestState(RequestState.Success);
              setSubjects(body.content);
            }
          })
          .catch(() => {
            Alert("Irgendas ist schiefgegangen", "error", context.theme);
          });
      }
    }
  }, [stepIndex, navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  const numChosen = (): number => {
    return Object.entries(chosen).reduce(
      (previous, [_, grade]) =>
        previous + (grade !== "" && grade !== undefined ? 1 : 0),
      0
    );
  };

  const handleClick = () => {
    setClickCount(clickCount + 1);
    if (clickCount === 10) {
      Alert(
        window.atob("V0lSIEJBVUVOIERJRSBTS1lCQVNFRUUK"),
        "success",
        context.theme
      );
      subjects.push({
        id: 0xbb,
        name: window.atob("Rm9ydG5pdGU="),
      });
    }
  };

  // converts something like christianlindner@fdp.de to Christian Lindner
  const emailToName = (email: string): string => {
    return email
      .split("@")[0]
      .split(".")
      .map((x) => capitalizeWord(x))
      .join(" ");
  };
  const capitalizeWord = (x: string): string => {
    return x.charAt(0).toUpperCase() + x.slice(1);
  };

  function register() {
    let tmp = chosen;
    Object.keys(chosen).map((key: any) => parseInt(chosen[key]));
    setIsDuplicate(false);

    fetch(`${API_HOST}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        grade: parseInt(grade),
        email: email + "@gymhaan.de",
        subjects: tmp,
        misc,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          // if duplicate
          if (res.status === 409) {
            setIsDuplicate(true);
          }
          throw new Error();
        }
      })
      .catch((error) => {
        console.log(error);
        Alert("Fehler beim Erstellen :((...", "error", context.theme);
      });
  }

  const handleChange = (e: any, subject: number) => {
    const grade: string = e.target.value;
    setChosen({
      ...chosen,
      ...{
        [subject]: grade,
      },
    });
  };

  function ChooseGrade(props: { subjectId: number }) {
    let subject: Subject = subjects.filter((x) => x.id === props.subjectId)[0];

    return (
      <div className={css.select_wrapper}>
        <div className={general.select_input_field}>
          <select
            name=""
            id=""
            className={general.select}
            onChange={(e) => handleChange(e, subject.id)}
            value={
              chosen[subject.id] !== undefined
                ? chosen[subject.id] !== ""
                  ? chosen[subject.id]
                  : undefined
                : undefined
            }
          >
            <option value="" className={css.na_option}>
              ---
            </option>
            {grades.map((grade, index) => {
              return (
                <option value={grade} key={index}>
                  bis Stufe {grade}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }

  // letter animation
  const letter = useRef(null);

  useEffect(
    () => {
      if (step !== 4) return;
      if (letter.current) {
        lottie.loadAnimation({
          container: letter.current,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData: require("../assets/animations/message.json"),
        });
      }
    },
    [step] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function newStep(theStep: number) {
    setStep(theStep);
    navigate(`/register/${theStep}`);
  }

  const login = useRef(null);

  useEffect(() => {
    if (login.current && location.pathname === "/register/1") {
      lottie.loadAnimation({
        container: login.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: require("../assets/animations/login.json"),
      });
      return () => {
        lottie.destroy();
      };
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render
  if (step === 1) {
    return (
      <div id={css.loginContainer}>
        <h1>Registrieren</h1>
        <div ref={login} id={css.loginAnimation}></div>
        <p>Gib die E-Mail-Adresse an, die du von der Schule bekommen hast.</p>
        <p>
          Das sollte dieselbe sein, die auch für Login bei Teams/Office 365
          benutzt wird.
        </p>
        {isDuplicate ? (
          <p style={{ color: "#e74c3c" }}>Diese E-Mail wird schon verwendet!</p>
        ) : null}
        <div className={css["input-fields"]}>
          <form
            onSubmit={(e) => {
              const schoolMailRegex = /(.*)\.(.*)(@gymhaan\.de)?/; // this allows too much, but I am not sure how they are generated exactly so '729asdf=9@.23aa~~3F@gymhaan.de' is valid for now
              if (email.match(schoolMailRegex)) {
                newStep(2);
                lottie.destroy();
              } else {
                Alert("Invalide E-Mail Adresse!", "error", context.theme);
                lottie.stop();
                lottie.setSpeed(1.5);
                lottie.play();
              }
              e.preventDefault();
            }}
          >
            <div className={css["input-field"]}>
              <input
                type="text"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  fetch(
                    `${API_HOST}/user/email-available/${e.target.value}@gymhaan.de`
                  ).then((res) => {
                    switch (res.status) {
                      case 200:
                        setIsDuplicate(false);
                        break;
                      case 409:
                        setIsDuplicate(true);
                        Alert(
                          "Diese E-Mail wird schon verwendet!",
                          "error",
                          context.theme
                        );
                        break;
                      default:
                        break;
                    }
                  });
                }}
                value={email.toLowerCase()}
              />
              <p id={css.gymhaanPlacehodler}>@gymhaan.de</p>
            </div>
            <input type="submit" value="weiter" className={css.submit} />
          </form>
        </div>
        <p className={css.step}>
          <span className={css.bullSpan}>&bull;</span>
          &bull;&bull;&bull;
        </p>
      </div>
    );
  } else if (step === 2) {
    return (
      <div id={css.container}>
        {requestState === RequestState.Success ? (
          <Fragment>
            <div id={css.formContainer}>
              <h1 onClick={() => handleClick()}>
                Wähle deine Fächer, {emailToName(email).split(" ")[0]}
              </h1>
              <h4>Fächer ausgewählt: {numChosen()}</h4>
              <h3>Beliebte Fächer:</h3>
              <div className={css.subjects}>
                {topSubjects.map((subjectName, index) => {
                  let matching = subjects.filter((x) => x.name === subjectName);
                  if (matching.length === 0) return null;
                  return (
                    <div
                      className={css.subject}
                      key={index}
                      id={
                        subjectName === window.atob("Rm9ydG5pdGU=")
                          ? css["DONT_LOOK_AT_THIS_PLS_DONT"]
                          : undefined
                      }
                    >
                      <h4>{matching[0].name}</h4>
                      <ChooseGrade subjectId={matching[0].id} />
                    </div>
                  );
                })}
              </div>
              <h3>Weitere Fächer:</h3>
              <div className={css.subjects}>
                {subjects
                  .sort()
                  .filter((x) => topSubjects.indexOf(x.name) === -1)
                  .map((subject, index) => {
                    return (
                      <div className={css.subject} key={index}>
                        <h4>{subject.name}</h4>
                        <ChooseGrade subjectId={subject.id} />
                      </div>
                    );
                  })}
              </div>
              <div id={css.submitContainer}>
                <input
                  type="submit"
                  value="Weiter"
                  className={css.next_button}
                  onClick={(e) => {
                    newStep(3);
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
          </Fragment>
        ) : (
          <LoadingScreen loaded={requestState !== RequestState.Loading} />
        )}
        <div className={css.step}>
          &bull;
          <span className={css.bullSpan}>&bull;</span>
          &bull;&bull;
        </div>
      </div>
    );
  } else if (step === 3) {
    return (
      <div id={css.loginContainer}>
        <h1>Deine Infos</h1>
        <div ref={login} id={css.loginAnimation}></div>
        <p>In welche Klasse/Stufe gehst du?</p>
        <div className={general.select_input_field}>
          <select
            name=""
            className={general.select}
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
            }}
          >
            <option value="">--- Stufe wählen ---</option>
            {grades.map((grade, index) => {
              return <option key={index}>{grade}</option>;
            })}
          </select>
        </div>
        <br />
        <p>Wenn du willst, kannst du hier noch etwas über dich schreiben.</p>
        <div className={general.select_input_field}>
          <textarea
            name=""
            value={misc}
            onChange={(e) => {
              setMisc(e.target.value.slice(0, 280));
            }}
            className={css.textarea}
          ></textarea>
        </div>
        <br />
        <br />
        <div className={general.flexdiv}>
          <button
            className={general.text_button}
            onClick={(e) => {
              if (isNaN(parseInt(grade))) {
                Alert("Bitte wähle deine Stufe!", "error", context.theme);
              } else {
                newStep(4);
                register();
              }
            }}
          >
            Weiter
          </button>
        </div>

        <p className={css.step}>
          &bull;&bull;
          <span className={css.bullSpan}>&bull;</span>
          &bull;
        </p>
      </div>
    );
  } else if (step === 4) {
    return (
      <div id={css.confirmContainer}>
        <h1>Bestätigen</h1>
        <div ref={letter} id={css.letterAnimation}></div>
        <p id={css.justifyText}>
          Damit wir deine Identität bestätigen können, haben wir dir eine E-Mail
          an{" "}
          <span className={general.text_marker}>
            {email}
            @gymhaan.de
          </span>{" "}
          geschickt.
          <br />
          Öffne diese und befolge die Anweisungen, um deinen Account zu
          aktivieren. <br />
          PS: Wenn du die E-Mail nicht findest, schau in deinem Spam/Junk-Ordner
          nach.
          <br />
          <p>
            <a href="https://outlook.office365.com/mail/">Link zu Outlook</a>
          </p>
        </p>
        <div className={css.placeholder}></div>
        <p className={css.step}>
          &bull;&bull;&bull;
          <span className={css.bullSpan}>&bull;</span>
        </p>
      </div>
    );
  } else return <></>;
};

export default RegisterPage;
