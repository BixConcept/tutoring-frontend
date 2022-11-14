import ExternalLink from "../Components/ExternalLink";
import { Link } from "react-router-dom";
import css from "../styles/Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faInfoCircle,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Home = (): JSX.Element => {
  document.title = "Nachhilfe GymHaan";

  interface Contributor {
    login: string;
    avatar_url: string;
    url: string;
    contributions: number;
    type: "User" | "Bot";
  }

  const [contributorsLoading, setContributorsLoading] = useState(true);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  async function fetchContributors() {
    setContributorsLoading(true);
    try {
      let frontendRes = await (
        await fetch(
          "https://api.github.com/repos/BixConcept/tutoring-frontend/contributors?q=contributions&order=desc"
        )
      ).json();

      let backendRes = await (
        await fetch(
          "https://api.github.com/repos/BixConcept/tutoring-backend-express/contributors?q=contributions&order=desc"
        )
      ).json();

      let merged = [...frontendRes, ...backendRes]

        // only human contributors
        .filter((contributor) => contributor.type === "User")
        // remove duplicates (people who worked on both )
        .reduce((prev, current) => {
          let index = 0;
          const filtered = prev.filter((x: Contributor, i: number) => {
            if (x.login === current.login) {
              index = i;
            }
            return x.login === current.login;
          });
          if (filtered.length === 0) {
            return [...prev, current];
          } else {
            // add contributions from both projects
            const copy = prev;
            prev[index].contributions += current.contributions;
            return copy;
          }
        }, [])
        .sort(
          (a: Contributor, b: Contributor) => b.contributions - a.contributions
        );

      setContributors(merged);
    } catch (e) {
      setContributors([]);
    }
    setContributorsLoading(false);
  }

  useEffect(() => {
    fetchContributors();
  }, []);

  return (
    <main id={css.main}>
      <section id={css.header}>
        <div id={css.title}>
          <h1>
            <span className={css.backdrop}>
              Nach&shy;hil&shy;fe&shy;plat&shy;tform
            </span>
          </h1>
          <h2>[SV am Gymnasium Haan]</h2>
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
      <section id={css.infoSection}>
        <div id={css.infoContent}>
          <div id={css.infoText}>
            <p>
              Für die Benutzung dieser Seite kannst du dich ganz einfach mit
              deiner Schul-Email registrieren.
            </p>
            <p>
              Durch die Nutzung dieser Seite erklärst du dich mit den
              Datenschutzbestimmungen einverstanden.
            </p>
            <p>
              <a href="https://instagram.com/sv.gymhaan">Link zur SV</a>
            </p>
          </div>
          <div id={css.infoIcon}>
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
        </div>
      </section>
      <section id={css.contributeSection}>
        <div id={css.contributeContainer}>
          <div id={css.contributeIcon}>
            <FontAwesomeIcon icon={faWrench} />
          </div>
          <div id={css.contributeContent}>
            <h2>Mitmachen</h2>
            <p>
              Dieses Projekt wird von Schüler:innen geleitet. Wenn du Interesse
              an Full-Stack-Entwicklung mit einem React+Typescript Frontend-
              und/oder einem Express.js+TypeScript Backend-Stack hast, kannst du
              einfach ein Issue finden und einen PR einreichen.
            </p>
            <p>
              Auch Features-Requests, Bug-Reports oder sonstiges Feedback sind
              immer erwünscht.
            </p>
            <Link to="/contribute">
              <div id={css.contributeMoreInfo}>
                Mehr Infos <FontAwesomeIcon icon={faLongArrowAltRight} />
              </div>
            </Link>

            <h3>Contributors 🧑‍🚀</h3>
            <p>Danke an alle, die hieran mitgeholfen haben &lt;3</p>
            <div id={css.contributors}>
              {contributorsLoading ? (
                <span>Loading</span>
              ) : (
                <>
                  {contributors.map((contributor) => (
                    <a
                      href={contributor.url}
                      title={`${contributor.login} (${contributor.contributions} contributions)`}
                    >
                      <img
                        className={css.contributor}
                        src={contributor.avatar_url}
                        alt={`${contributor.login} (${contributor.contributions} contributions)`}
                      ></img>
                    </a>
                  ))}
                  <Link to="/contribute">
                    <div id={css.contributorYou} className={css.contributor}>
                      du?
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
