import Page from "../Components/Page";
import css from "../styles/Imprint.module.scss";

const Imprint = (): JSX.Element => {
  const imprint: string = "https://gymhaan.de/unsere-schule/impressum/";

  return (
    <Page title="Impressum">
      Das Impressum unserer Schule ist zu finden auf:{" "}
      <a href={imprint}>{imprint}</a>
    </Page>
  );
};

export default Imprint;
