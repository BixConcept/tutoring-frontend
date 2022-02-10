import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { API_HOST } from "../API_HOST";
import LoadingScreen from "../Components/LoadingScreen";
import css from "../styles/verify.module.scss";
import general from "../styles/general.module.scss";
import lottie from "lottie-web";

function Verify(): JSX.Element {
  const { code } = useParams();

  const [verified, setVerified] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const successRef = useRef(null);
  const failureRef = useRef(null);

  useEffect(() => {
    fetch(`${API_HOST}/user/verify?code=${code}`)
      .then((res) => {
        setLoaded(true);
        if (res.ok) {
          setVerified(true);
        }
      })
      .catch((e) => {
        setLoaded(true);
        setVerified(false);
      });
  }, []);

  useEffect(() => {
    lottie.destroy();
    if (successRef.current) {
      lottie.loadAnimation({
        container: successRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../assets/animations/success.json"),
      });
    }
    if (failureRef.current) {
      lottie.loadAnimation({
        container: failureRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../assets/animations/failure.json"),
      });
    }
  });

  return (
    <div id={css.container} className={general["weird-shadow"]}>
      {!loaded ? (
        <LoadingScreen loaded={loaded} />
      ) : (
        <Fragment>
          {verified ? (
            <h1>Erfolgreich verifiziert!</h1>
          ) : (
            <h1>Das hat eher nicht geklappt</h1>
          )}
          {verified ? (
            <div ref={successRef} id={css["animation-container"]}></div>
          ) : (
            <div ref={failureRef} id={css["animation-container"]}></div>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default Verify;
