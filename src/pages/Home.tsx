import css from "../styles/Home.module.scss";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  document.title = "Nachhilfe GymHaan";

  return (
    <main id={css.main}>
      <section id={css.mainThingy}>
        <div id={css.title}>
          <h1>
            <span className={css.backdrop}>sv nachhilfeplattform</span>
          </h1>
        </div>
      </section>
      <section id={css.applySection}>
        <div className={css.applyFlexContainer}>
          <div className={css.informationText}>
            <p>
              Wenn du in einem Fach Nachhilfe geben möchtest, kannst du dich
              ganz einfach mit deiner Schul-Email registrieren. Für alle die
              Nachhilfe brauchen funktioniert der Zugang ohne Registrierung.{" "}
            </p>
            <p>
              Durch die Nutzung dieser Seite erklärst du dich mit den{" "}
              <a href="/privacy" className={css.link}>
                Datenschutzbestimmungen einverstanden.
              </a>
            </p>
            <p>
              Irgendwas hat{" "}
              <a href="https://instagram.com/sv.gymhaan">die SV</a> mit dieser
              Seite auch zu tun sagen sie.
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
};

export default Home;
