import Page from "../Components/Page";

function Imprint() {
  let imprint = "https://gymhaan.de/unsere-schule/impressum/";
  return (
    <Page title="Impressum">
      Das Impressum unserer Schule ist zu finden auf:{" "}
      <a href={imprint}>{imprint}</a>
    </Page>
  );
}

export default Imprint;
