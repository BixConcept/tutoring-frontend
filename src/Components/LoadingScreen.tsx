import { useState } from "react";
import Logo from "./assets/images/logo.svg";
import css from "./styles/LoadingScreen.module.scss";

function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);

  fetch("https://google.com/", {
    method: "GET",
    mode: "no-cors",
  }).then(() => {
    setLoaded(true);
  });

  return (
    <div className="LoadingScreen">
      {loaded ? <p>Loaded</p> : null}
      <div className="spinner">
        <img
          src={Logo}
          className="LoadingSpin"
          alt="spin"
          style={{ opacity: loaded ? 0 : 1 }}
        />
      </div>
    </div>
  );
}

export default LoadingScreen;
