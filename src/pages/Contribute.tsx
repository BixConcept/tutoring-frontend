import ExternalLink from "../Components/ExternalLink";
import { Link } from "react-router-dom";
import css from "../styles/Contribute.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faInfoCircle,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Page from "../Components/Page";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// add your username here if you'd like to have your name on the page
const usernameToRealName: { [key: string]: string } = {
  "3nt3": "Nia Schlegel, Q2",
  durek1337: "Hr. Höltgen",
} as const;

const Contribute = (): JSX.Element => {
  document.title = "Nachhilfe GymHaan";

  interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
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
    <Page title="Mitmachen 🚀" center={true} id={css.page}>
      <h2>
        Source Code <FontAwesomeIcon icon={faGithub} />
      </h2>
      <div id={css.repos}>
        <div className={css.repo}>
          <a href="https://github.com/BixConcept/tutoring-frontend">
            frontend <ExternalLink />
          </a>
        </div>
        <div className={css.repo}>
          <a href="https://github.com/BixConcept/tutoring-backend-express">
            backend <ExternalLink />
          </a>
        </div>
      </div>

      <p>
        Es haben schon mindestens {contributors.length} Leute in irgendeiner
        Form aktiv bei diesem Projekt mitgeholfen und wir hoffen, dass es mehr
        werden.
      </p>
      <p>
        Vorallem problematisch ist die Tatsache, dass fast alle der bisherigen
        Contributor Mitglieder der Q2 (Abitur 2023) und damit ab nächstem Jahr
        keine Mitglieder der Schule sein werden.
      </p>
      {/* TODO: add more info about tech and things people can do */}
      <p className={css.highlight}>
        Wenn du also jünger und an diesem Projekt interessiert bist, melde dich
        vielleicht bei uns ✨
      </p>
      <h2>Contributors 🧑‍🚀</h2>
      <p>
        Hier nochmal ausführlicher Dank an alle Leute die was gemacht haben :3
      </p>
      <div id={css.contributors}>
        {contributorsLoading
          ? "Yo es lädt immer noch"
          : contributors.map((contributor) => (
              <a href={contributor.html_url}>
                <div className={css.contributor}>
                  <img
                    src={contributor.avatar_url}
                    alt={`${contributor.login}s profilbild'`}
                  />
                  <p className={css.contributorName}>
                    {(usernameToRealName[contributor.login] as string) ||
                      contributor.login}{" "}
                  </p>
                  <p className={css.contributorCommitCount}>
                    {contributor.contributions} commits
                  </p>
                </div>
              </a>
            ))}
      </div>
      <a
        href="https://github.com/BixConcept/tutoring-frontend/contributors"
        id={css.contributorsExternalLink}
      >
        Diese Liste auf Github
      </a>
    </Page>
  );
};

export default Contribute;
