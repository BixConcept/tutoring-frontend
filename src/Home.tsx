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
        <div id="home-choices">
          <div className="home-choice">
            <h1>Ich brauche Nachhilfe</h1>
            <i className="fas fa-user-graduate"></i>
          </div>
          <div className="home-choice">
            <h1>Ich möchte Nachhilfe geben</h1>
            <i className="fas fa-chalkboard-teacher"></i>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              beatae, porro nesciunt cupiditate atque numquam cum iure, officia
              labore ipsum maiores tempora aliquam eum! Quod nobis corporis
              itaque ut perferendis.
            </p>
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
