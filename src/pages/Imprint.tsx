import css from "../styles/Imprint.module.scss";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";

function Imprint() {
  const container = useRef(null);

  useEffect(() => {
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
}

export default Imprint;
