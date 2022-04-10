import css from "../styles/Home.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

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
              Für die Benutzung dieser Seite kannst du dich ganz einfach mit
              deiner Schul-Email registrieren.
            </p>
            <p>
              Durch die Nutzung dieser Seite erklärst du dich mit den{" "}
              <Link to="/privacy" className={css.link}>
                Datenschutzbestimmungen
              </Link>{" "}
              einverstanden.
            </p>
            <p>
              <a href="https://instagram.com/sv.gymhaan">
                Link zur SV <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            </p>
          </div>
          <div id={css.choices}>
            <div className={css.choice}>
              <Link to="/find">
                <h1>
                  <span className={css.backdrop}>Nachhilfe finden</span>
                </h1>
              </Link>
            </div>
            <div className={css.choice}>
              <Link to="/register">
                <h1>
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
