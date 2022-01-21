import css from "../styles/Home.module.scss";

function Home() {
  document.title = "Nachhilfe GymHaan";
  // TODO: actual data
  // const requestsPerMonth = 12;
  // const numTutors = 12;

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
              Daher haben wir auf Nachfrage der SV ein Ort geschaffen, wo
              Schüler Schülern helfen.
            </p>
            <p>
              Wir haben eine Nachhilfeplattform geschaffen, wo jeder mitmachen
              kann. Brauchst du Nachhilfe? Wir finden jemanden von der
              Schülerschaft der dir Nachhilfe gibt.
            </p>
            <p>
              Bist du nett??? Wir brauchen dich! Trage dich als
              Nachhilfelehrenden ein und bessere dir dein Taschengeld auf, mit
              dem du noch mehr konsumieren und den Zerfall der westlichen
              Zivilisation vorantreiben kannst.
            </p>
          </div>
          <div id={css.choices}>
            <div className={css.choice}>
              <a href="/find">
                <h1>Ich brauche Nachhilfe</h1>
              </a>
            </div>
            <div className={css.choice}>
              <h1>
                <a href="/register">
                  Ich möchte <span>Nachhilfe geben</span>
                </a>
              </h1>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="stats-section">
        <h2 id="stat-title">Statistiken</h2>
        <div id="stats">
          <div className="stat">
            <h3>{requestsPerMonth}</h3>
            <h4>Anfragen pro Monat</h4>
          </div>
          <div className="stat">
            <h3>{numTutors}</h3>
            <h4>Nachhilfelehrer:innen</h4>
          </div>
          <div className="stat">
            <h3>{numTutors}</h3>
            <h4>Nachhilfelehrer:innen</h4>
          </div>
        </div>
      </section>*/}
    </main>
  );
}

export default Home;
