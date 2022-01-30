import css from "../styles/Home.module.scss";
import { Link } from "react-router-dom";

function Home() {
  document.title = "Nachhilfe GymHaan";

  return (
    <main>
      <section id={css.mainThingy}>
        <div id={css.title}>
          <h1>
            <span className={css.backdrop}>Nachhilfeplattform</span>
          </h1>
        </div>
      </section>
      <section id={css.applySection}>
        <div className={css.applyFlexContainer}>
          <div className={css.informationText}>
            <p>
              Unsere Schule sieht sich als Europa-Schule mit Europa sehr stark
              verbunden. Außerdem hat unsere Schule 1000 verschiedene Siegel,
              einfach nur weil wir es können.
            </p>
            <p>
              Unter anderem sind wir äußerst stolz auf unser Fair-Trade Siegel
              und unser Berufswahl Siegel. Wir sehen uns als Schule von Morgen
              und als ein Raum der Lernentwicklung des einzelnen Individuums.
              Hier noch irgendeine Scheiße juckt eh keinen was hier steht danke
              laurens. Daher haben wir auf Nachfrage der SV einen Ort
              geschaffen, an dem wir uns gegenseitig helfen.
            </p>
            <p>
              Wir haben eine Nachhilfeplattform geschaffen, an der jeder
              mitmachen kann. Brauchst du Nachhilfe? Wir finden jemanden von der
              Schülerschaft der dir Nachhilfe gibt.
            </p>
            <p>
              Falls du Interesse daran zeigst, dich hier einzutragen, tu dies.
              Wir sind große Freunde derjenigen die sich bereiterklären (gegen
              ein Entgeld) anderen zu helfen und möchten deren User Experience
              perfektionieren.
            </p>
            <p>
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
                  Ich möchte <span>Nachhilfe geben</span>
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
