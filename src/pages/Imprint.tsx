import css from "../styles/Imprint.module.scss";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import Page from "../Components/Page";

function Imprint() {
  let imprint = "https://gymhaan.de/unsere-schule/impressum/";
  /* 
  const container = useRef(null);  
  useEffect(() => {
    document.title = "Impressum";
    if (container.current)
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../assets/animations/maintenance.json"),
      });
  }, []);
    return <div className={css.animation_container} ref={container}></div>;
  */

  return (
    <Page title="Impressum">
      Das Impressum unserer Schule ist zu finden auf:{" "}
      <a href={imprint}>{imprint}</a>
    </Page>
  );
}

export default Imprint;
