import "./styles/Home.scss";

function Home() {
  // TODO: actual data
  const requestsPerMonth = 12;
  const numTutors = 12;

  return (
    <main>
      <section id="main-thingy">
        <div id="title">
          <h1>Nachhilfe&shy;plattform oder so</h1>
        </div>
      </section>
      <section id="apply-section">
        <div className="apply-flex-container">
          <div className="information-text">
            <p>
              Unsere Schule sieht sich als Europa-Schule mit Europa sehr stark
              verbunden. Außerdem hat unsere Schule 1000 verschiedene Siegel,
              einfach nur weil wir es können. Unter anderem sind wir äußerst
              stolz auf unser Fair-Trade Siegel und unser Berufswahl Siegel. Wir
              sehen uns als Schule von Morgen und als ein Raum der
              Lernentwicklung des einzelnen Individuums. Daher haben wir auf
              Nachfrage der SV einen Ort geschaffen, an dem Schüler Schülern helfen.
              Wir haben eine Nachhilfeplattform geschaffen, an der jeder mitmachen
              kann. Brauchst du Nachhilfe? Wir finden einen netten Schüler, der
              dir Nachhilfe gibt. Bist ein so besagter netter Schüler? Wir brauchen
              dich! Trage dich als Nachhilfe Gebender ein und besser dir dein
              Taschengeld auf, mit dem du noch mehr konsumieren und den Zerfall
              der westlichen Zivilisation vorantreiben kannst.
            </p>
          </div>
          <div id="home-choices">
            <div className="home-choice">
              <h1>Ich brauche Nachhilfe</h1>
            </div>
            <div className="home-choice">
              <h1>Ich möchte Nachhilfe geben</h1>
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
