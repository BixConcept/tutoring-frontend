import { useState, useContext, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../ThemeContext";
import lottie from "lottie-web";
import css from "../styles/registerPage.module.scss";
import general from "../styles/general.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router";
import { subjects, topSubjects } from "../Models";
import Alert from "../Components/Alert";
import { API_HOST } from "..";

function RegisterPage() {
  document.title = "Registrieren";
  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];

  const [email, setEmail] = useState("");
  const [chosen, setChosen] = useState<{ [key: string]: string }>({});
  const [grade, setGrade] = useState("");
  const [misc, setMisc] = useState("");

  const navigate = useNavigate();
  const { stepIndex } = useParams();

  const [step, setStep] = useState(1);

  const location = useLocation();

  useEffect(() => {
    if (!stepIndex) {
      navigate("/register/1", { replace: true });
    } else {
      let parsedIndex = parseInt(stepIndex);
      if (isNaN(parsedIndex)) {
        navigate("/register/1", { replace: true });
      } else {
        setStep(parsedIndex);
      }
    }
  }, [stepIndex, navigate]);

  const context = useContext(ThemeContext);

  function checkTheme(): "dark" | "light" {
    // to have type safety
    if (context.theme === "dark" || context.theme === "light") {
      return context.theme;
    } else {
      return "dark";
    }
  }

  function numChosen(): number {
    return Object.entries(chosen).reduce(
      (previous, [subject, grade]) =>
        previous + (grade !== "" && grade !== undefined ? 1 : 0),
      0
    );
  }

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
    Object.keys(chosen).map((key, index) => parseInt(chosen[key]));

    fetch(`${API_HOST}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        grade: parseInt(grade),
        email: email + "@gymhaan.de",
        subjects: tmp,
        misc,
      }),
      headers: { "Content-Type": "application/json" },
    }).catch((error) => {
      console.log(error);
      Alert("Fehler beim Erstellen :((...", "error", checkTheme());
    });
  }

  const handleChange = (e: any, subject: string) => {
    const grade: string = e.target.value;
    setChosen({
      ...chosen,
      ...{ [subject]: grade },
    });
  };

  function ChooseGrade(props: { subject: string }) {
    console.log(chosen[props.subject]);
    return (
      <div className={css.select_wrapper}>
        <div className={general.select_input_field}>
          <select
            name=""
            id=""
            className={general.select}
            onChange={(e) => handleChange(e, props.subject)}
            value={
              chosen[props.subject] !== undefined
                ? chosen[props.subject] !== ""
                  ? chosen[props.subject]
                  : undefined
                : undefined
            }
          >
            <option value="asdf" className={css.na_option}>
              ---
            </option>
            {grades.map((grade, index) => {
              return (
                <option value={index + 5} key={index + 5}>
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

  useEffect(() => {
    if (letter.current) {
      lottie.loadAnimation({
        container: letter.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../assets/animations/message.json"),
      });
    }
  });

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
  }, []);

  // Render
  if (step === 1) {
    return (
      <div id={css.loginContainer}>
        <h1>Anmelden</h1>
        <div ref={login} id={css.loginAnimation}></div>
        <p>Gib die E-Mail-Adresse an, die du von der Schule bekommen hast.</p>
        <p>
          Das sollte dieselbe sein, die auch für Login bei Teams/Office 365
          benutzt wird.
        </p>
        <div className={css["input-fields"]}>
          <form
            onSubmit={(e) => {
              const schoolMailRegex = /(.*)\.(.*)(@gymhaan\.de)?/; // this allows too much, but I am not sure how they are generated exactly so '729asdf=9@.23aa~~3F@gymhaan.de' is valid for now
              if (email.match(schoolMailRegex)) {
                newStep(2);
                lottie.destroy();
              } else {
                Alert("Invalide E-Mail Adresse!", "error", checkTheme());
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
                }}
                value={email.toLowerCase()}
              />
              <p id={css.gymhaanPlacehodler}>@gymhaan.de</p>
            </div>
            <input type="submit" value="weiter" className={css.submit} />
          </form>
        </div>
        <p className={css.step}>
          <span className={css.bullSpan}>&bull;</span>&bull;&bull;&bull;
        </p>
        <ToastContainer />
      </div>
    );
  } else if (step === 2) {
    return (
      <div id={css.container}>
        <div id={css.formContainer}>
          <h1>Wähle deine Fächer, {emailToName(email).split(" ")[0]}</h1>
          <h4>Fächer ausgewählt: {numChosen()}</h4>
          <div className={css.subjects}>
            <h3>Beliebte Fächer:</h3>
            {topSubjects.map((subject, index) => {
              return (
                <div className={css.subject} key={index}>
                  <h4>{subject}</h4>
                  <ChooseGrade subject={subject} />
                </div>
              );
            })}
          </div>
          <div className={css.subjects}>
            <h3>Weitere Fächer:</h3>
            {subjects.sort().map((subject, index) => {
              return (
                <div className={css.subject} key={index}>
                  <h4>{subject}</h4>
                  <ChooseGrade subject={subject} />
                </div>
              );
            })}
          </div>
          <div id={css.submitContainer}>
            <input
              type="submit"
              value="weiter"
              className={css.next_button}
              onClick={(e) => {
                newStep(3);
                e.preventDefault();
              }}
            />
          </div>
        </div>
        <div className={css.step}>
          &bull;<span className={css.bullSpan}>&bull;</span>&bull;&bull;
        </div>

        <ToastContainer />
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
                Alert("Bitte wähle deine Stufe!!!", "error", checkTheme());
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
          &bull;&bull;<span className={css.bullSpan}>&bull;</span>&bull;
        </p>
        <ToastContainer />
      </div>
    );
  } else if (step === 4) {
    return (
      <div id={css.confirmContainer}>
        <h1>Bestätigen</h1>
        <div ref={letter} id={css.letterAnimation}></div>
        <p id={css.justifyText}>
          Damit wir deine Identität bestätigen können, haben wir dir eine E-Mail
          an <span className={general.text_marker}>{email}@gymhaan.de</span>{" "}
          geschickt.
          <br />
          Öffne diese und befolge die Anweisungen, um deinen Account zu
          aktivieren. <br />
          PS: Wenn du die E-Mail nicht findest, schau in deinem Spam-Ordner
          nach.
          <br />
          <p>
            <a href="https://outlook.office365.com/mail/">Link zu Outlook</a>
          </p>
        </p>
        <div className={css.placeholder}></div>
        <p className={css.step}>
          &bull;&bull;&bull;<span className={css.bullSpan}>&bull;</span>
        </p>
        <ToastContainer />
      </div>
    );
  } else return null;
}

export default RegisterPage;
