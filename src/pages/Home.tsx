import ExternalLink from "../Components/ExternalLink";
import { Link } from "react-router-dom";
import css from "../styles/Home.module.scss";

const Home = (): JSX.Element => {
  document.title = "Nachhilfe GymHaan";

  return (
    <main id={css.main}>
      <section id={css.header}>
        <div id={css.title}>
          <h1>
            <span className={css.backdrop}>Nachhilfeplattform</span>
          </h1>
        </div>
        <div id={css.scrollDown}>SCROLL</div>
      </section>
      <section id={css.applySection}>
        <div className={css.applyFlexContainer}>
          <div className={css.choice}>
            <Link to="/find">
              <h1>Nachhilfe finden</h1>
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
      </section>
      <section id={css.infoSection}></section>
      <section id={css.contributeSection}></section>
    </main>
  );
};

export default Home;
