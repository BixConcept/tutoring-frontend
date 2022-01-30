import { useState, useContext, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../ThemeContext";
import lottie from "lottie-web";
import css from "../styles/registerPage.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import { subjects } from "../Models";

function RegisterPage() {
  document.title = "Registrieren";
  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];

  const [id] = useState("");
  const [email, setEmail] = useState("");
  const [chosen] = useState([]);

  const navigate = useNavigate();
  const { stepIndex } = useParams();

  const [step, setStep] = useState(1);

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

  function register() {
    if (/^-?[\d.]+(?:e-?\d+)?$/.test(id) && chosen.length > 1) {
      toast.success("User wird erstellt...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: checkTheme(),
        progress: undefined,
      });
    } else {
      toast.error("Ungültige Daten", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: checkTheme(),
        progress: undefined,
      });
    }
  }

  function ChooseGrade() {
    return (
      <select name="" id="">
        <option value="">--- Stufe auswählen ---</option>
        {grades.map((grade, index) => {
          return <option key={index}>{grade}</option>;
        })}
      </select>
    );
  }

  // Smile Animation
  const smile = useRef(null);
  useEffect(() => {
    if (smile.current) {
      lottie.loadAnimation({
        container: smile.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../assets/animations/smile.json"),
      });
    }
  });

  function newStep(theStep: number) {
    setStep(theStep);
    navigate(`/register/${theStep}`);
  }

  // Render
  if (step === 1) {
    return (
      <div id={css.container}>
        <h1>Anmelden</h1>
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
              } else {
                toast.error(
                  "Die angegebene E-Mail Addresse ist leider nicht valide."
                );
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
              />
              <p id={css.gymhaanPlacehodler}>@gymhaan.de</p>
            </div>
            <input type="submit" value="weiter" className={css.submit} />
          </form>
        </div>
        <p className={css.step}>Schritt {step} / 3</p>
        <ToastContainer />
      </div>
    );
  } else if (step === 2) {
    return (
      <div id={css.container}>
        <div id={css.formContainer}>
          <h1>Fächer auswählen</h1>
          <h4>Deine E-Mail: {email}@gymhaan.de</h4>
          {/*
          <table>
            <thead>
              <tr>
                <th>Fach</th>
                <th>Stufe</th>
                <th>Chechbox</th>
              </tr>
            </thead>
            <tbody>
              {subjects.sort().map((subject, index) => {
                return (
                  <tr key={index}>
                    <td>{subject}</td>
                    <td>
                      <ChooseStufe />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>Fortnite</td>
                <td>
                  <select name="" id="">
                    <option value="">--- Bereich auswählen ---</option>
                    <option>Bauen</option>
                    <option>Editieren</option>
                    <option>Aim</option>
                    <option>Skin Contest</option>
                  </select>
                </td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            </tbody>
          </table>
          */}
          <div className={css.subjects}>
            {subjects.sort().map((subject, index) => {
              return (
                <div className={css.subject} key={index}>
                  <h4>{subject}</h4>
                  <ChooseGrade />
                  <input type="checkbox" />
                </div>
              );
            })}
          </div>
          <input
            type="submit"
            value="weiter"
            className={css.submit}
            onClick={(e) => {
              setStep(3);
              e.preventDefault();
            }}
          />
          <input type="submit" value="weiter" className={css.submit} />
        </div>
        <p className={css.step}>Schritt {step} / 3</p>
        <ToastContainer />
      </div>
    );
  } else if (step === 3) {
    return (
      <div id={css.container}>
        <h1>Bestätigen</h1>
        <p>
          Wir haben eine Bestätigungs-E-Mail an {email}@gymhaan.de geschickt.
        </p>
        <div ref={smile}></div>
        <div className={css.placeholder}></div>
        <p className={css.step}>Schritt {step} / 3</p>
        <ToastContainer />
      </div>
    );
  } else return null;
}

export default RegisterPage;
