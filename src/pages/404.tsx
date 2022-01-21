import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import css from "../styles/404.module.scss";
import lottie from "lottie-web";

export default function FourOFourPage() {
  const container = useRef(null);

  useEffect(() => {
    if (container.current)
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../assets/animations/not-found.json"),
      });
  }, []);

  return (
    <div id={css.wrapper}>
      <div id={css.centered}>
        <div className={css.animationContainer} ref={container}></div>
        <p>Diese Seite existiert nicht.</p>
        <Link to="/">zurück</Link>
      </div>
    </div>
  );
}
