import css from "../styles/Home.module.scss";
import { Link } from "react-router-dom";

function Home() {
  document.title = "Nachhilfe GymHaan";

  return (
    <main>
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
            <p>Willkommen auf unserem Nachhilfeportal!🥳</p>
            <p>
              Diese Seite wird komplett von Schülern geführt und entwickelt.
              Wenn du in einem Fach Nachhilfe geben möchtest, kannst du dich
              ganz einfach mit deiner Schul-Email registrieren. Für alle die
              Nachhilfe brauchen funktioniert der Zugang ohne Registrierung.{" "}
              <br />
              Viel Erfolg beim lernen! Eure Webseitenersteller aus dem
              Info-Kurs🤗 <br />
              WIP: falls du ein Problem auf dieser Website finden mögest,{" "}
              <a
                id={css["issue-link"]}
                href="https://github.com/HaanerBarbaren/tutoring-frontend/issues"
              >
                öffne ein Issue!
              </a>
            </p>
          </div>
          <div id={css.choices}>
            <div className={css.choice}>
              <Link to="/find">
                <h1>Ich brauche Nachhilfe</h1>
              </Link>
            </div>
            <div className={css.choice}>
              <Link to="/register">
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
}

export default Home;
