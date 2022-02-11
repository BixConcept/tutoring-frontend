import Page from "../Components/Page";

const Imprint = (): JSX.Element => {
  let imprint = "https://gymhaan.de/unsere-schule/impressum/";
  return (
    <Page title="Impressum">
      Das Impressum unserer Schule ist zu finden auf:{" "}
      <a href={imprint}>{imprint}</a>
    </Page>
  );
};

export default Imprint;
