import css from "../styles/Home.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { OurContext } from "../OurContext";
import Alert from "../Components/Alert";

const Home = (): JSX.Element => {
  document.title = "Nachhilfe GymHaan";

  const context = useContext(OurContext);

  return (
    <main id={css.main}>
      <section id={css.mainThingy}>
        <div id={css.title}>
          <h1>
            <span className={css.backdrop}>
              Nach&shy;hil&shy;fe&shy;platt&shy;form
            </span>
          </h1>
        </div>
      </section>
      <section id={css.applySection}>
        <div className={css.applyFlexContainer}>
          <div className={css.informationText}>
            <p>Willkommen auf unserem Nachhilfeportal! 🥳</p>
            <p>
              Diese Seite wird komplett von Schülern geführt und entwickelt.
              Wenn du in einem Fach Nachhilfe geben möchtest, kannst du dich
              ganz einfach mit deiner Schul-Email registrieren. Für alle die
              Nachhilfe brauchen funktioniert der Zugang ohne Registrierung.{" "}
              <br />
              Viel Erfolg beim Lernen! Eure Webseitenersteller aus dem Info-Kurs
              🤗 <br />
              WIP: falls du ein Problem auf dieser Website findest,{" "}
              <a
                className={css.link}
                href="https://github.com/HaanerBarbaren/tutoring-frontend/issues"
              >
                öffne ein Issue!
              </a>
            </p>
            <p>
              Mit der Nutzung dieser Seite erklärst du dich mit den <a href="/privacy" className={css.link}>Datenschutzbestimmungen</a> einverstanden.
            </p>
          </div>
          <div id={css.choices}>
            <div className={css.choice}>
              <Link to="/find">
                <h1>Ich brauche Nachhilfe</h1>
              </Link>
            </div>
            <div
              className={css.choice}
              onClick={(e) => {
                if (!context.cookieConsent) {
                  Alert(
                    "Um dich registrieren zu können musst du unserem Session-Cookie zustimmen.",
                    "info",
                    context.theme
                  );
                  context.setCookieModalVisible(true);
                  e.preventDefault();
                }
              }}
            >
              <Link to={context.cookieConsent ? "/register" : "#"}>
                <h1>
                  Ich möchte{" "}
                  <span className={css.backdrop}>Nachhilfe geben</span>
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
