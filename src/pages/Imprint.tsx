import ExternalLink from "../Components/ExternalLink";
import Page from "../Components/Page";

const Imprint = (): JSX.Element => {
  return (
    <Page title="Impressum">
      Das Impressum unserer Schule ist{" "}
      <a href={"https://gymhaan.de/unsere-schule/impressum/"}>
        hier <ExternalLink />
      </a>{" "}
      zu finden.
    </Page>
  );
};

export default Imprint;
