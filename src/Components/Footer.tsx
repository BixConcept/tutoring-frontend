import css from "../styles/Footer.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { OurContext } from "../OurContext";

const Footer = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const context = useContext(OurContext);
  return (
    <footer
      className={css.footer}
      style={{ filter: context.cookieModalVisible ? "blur(8px)" : undefined }}
    >
      <a
        href={`https://github.com/BixConcept/tutoring-frontend/commit/${process.env.REACT_APP_GIT_SHA}`}
      >
        Version {process.env.REACT_APP_GIT_SHA}
      </a>
      <a href="https://github.com/BixConcept/tutoring-frontend">
        Source Code <FontAwesomeIcon icon={faGithub} />
      </a>
      <Link to="/license">Lizenz</Link>
      <Link to="/privacy">Datenschutz</Link>
      <Link to="/imprint">Impressum</Link>
    </footer>
  );
};

export default Footer;
