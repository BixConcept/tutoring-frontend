import { useEffect, useRef, useState } from "react";

import css from "../styles/LoadingScreen.module.scss";
import lottie from "lottie-web";

const LoadingScreen = (props: { loaded: boolean }): JSX.Element => {
  const loading = useRef(null);
  const { loaded } = props;
  const [initialized, setInitialized] = useState(false); // to not have the animation added multiple times

  useEffect(() => {
    if (loading.current && !initialized) {
      setInitialized(true);
      lottie.loadAnimation({
        container: loading.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../assets/animations/loading.json"),
      });
    }
  }, [initialized]);
  return (
    <div
      className={css.LoadingScreen}
      style={{
        opacity: loaded ? 0 : 1,
        transition: `opacity ${loaded ? "0s" : "100ms"} ease-in-out`, // this is so the animation play
      }}
    >
      <div
        className={css.loading_animation}
        ref={loading}
        style={{ height: 300 }}
      ></div>
    </div>
  );
};

export default LoadingScreen;
