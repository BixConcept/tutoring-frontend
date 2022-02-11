import css from "../styles/NotFound.module.scss";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const NotFound = () => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current)
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../assets/animations/404.json"),
      });
  }, []);

  return <div className={css.animation_container} ref={container}></div>;
};

export default NotFound;
