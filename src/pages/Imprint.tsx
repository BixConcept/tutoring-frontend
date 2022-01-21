import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import Page from "../Components/Page";

function Imprint() {
  const container = useRef(null);

  useEffect(() => {
    if (container.current)
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("./office.json"),
      });
  }, []);

  return (
    <Page title="Impressum">
      <div className="container" ref={container}></div>
    </Page>
  );
}

export default Imprint;
