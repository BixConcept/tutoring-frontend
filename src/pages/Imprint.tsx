import Page from "../Components/Page";
import { useState } from "react";
import BixConcept from "../assets/images/bixconcept.svg";
import css from "../styles/Imprint.module.scss";

const Imprint = (): JSX.Element => {
  let imprint = "https://gymhaan.de/unsere-schule/impressum/";
  const [clickCount, setClickCount] = useState(0);

  return (
    <Page title="Impressum">
      <span
        onClick={() => {
          setClickCount(clickCount + 1);
        }}
      >
        Das Impressum
      </span>{" "}
      unserer Schule ist zu finden auf: <a href={imprint}>{imprint}</a>
      {clickCount >= 10 ? (
        <a href="https://bixconcept.tech">
          <img src={BixConcept} alt="BixConcept" id={css.img} />
        </a>
      ) : null}
    </Page>
  );
};

export default Imprint;
