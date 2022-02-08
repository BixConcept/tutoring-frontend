import Page from "../Components/Page";
import Bauarbeiter from "../assets/images/bauarbeiter.gif";

function Privacy() {
  return (
    <Page title={"Datenschutz"}>
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          width: "50%",
          marginRight: "7%",
        }}
      >
        <img src={Bauarbeiter} alt="Bauarbeiter" />
      </div>
    </Page>
  );
}

export default Privacy;
