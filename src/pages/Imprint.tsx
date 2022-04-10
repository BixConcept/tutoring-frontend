import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "../Components/Page";
import css from "../styles/Imprint.module.scss";

const Imprint = (): JSX.Element => {
  const imprint: string = "https://gymhaan.de/unsere-schule/impressum/";

  return (
    <Page title="Impressum">
      Das Impressum unserer Schule ist{" "}
      <a href={imprint}>
        hier <FontAwesomeIcon icon={faExternalLinkAlt} />
      </a>{" "}
      zu finden.
    </Page>
  );
};

export default Imprint;
