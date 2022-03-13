import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { API_HOST } from "../index";
import LoadingScreen from "../Components/LoadingScreen";
import css from "../styles/verify.module.scss";
import general from "../styles/general.module.scss";
import lottie from "lottie-web";
import { OurContext } from "../OurContext";
import { useSearchParams } from "react-router-dom";

const TimedRedirect = (props: { href: string; verified: boolean }) => {
  const { href, verified } = props;
  let [num, setNum] = useState<number>(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (num <= 0) {
      return navigate(href);
    }
    const id = setInterval(() => setNum(num - 1), 1000);
    return () => clearInterval(id);
  }, [num]);

  return verified ? (
    <p>Du wirst in {num}s zum Dashboard weitergeleitet</p>
  ) : (
    <p>Du wirst in {num}s zurückgeleitet</p>
  );
};

const Verify = () => {
  const { code } = useParams();

  const [verified, setVerified] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const successRef = useRef(null);
  const failureRef = useRef(null);
  const context = useContext(OurContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const intent = Object.fromEntries([...searchParams])["intent"];
    fetch(`${API_HOST}/user/verify?code=${code}`, { credentials: "include" })
      .then(async (res) => {
        setLoaded(true);
        if (res.ok) {
          setVerified(true);

          const userRes = await fetch(`${API_HOST}/user`, {
            credentials: "include",
          });
          if (!userRes.ok) {
            setVerified(false);
          } else {
            try {
              const json = await userRes.json();
              context.setUser(json.content);
              if (intent) {
                navigate(intent);
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      })
      .catch((_) => {
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
            <Fragment>
              <h1>Erfolgreich verifiziert!</h1>
              <TimedRedirect href="/dashboard" verified={true} />
            </Fragment>
          ) : (
            <Fragment>
              <h1>Verifizierung fehlgeschlagen!</h1>
              <p style={{ textAlign: "center" }}>
                Der Verifizierungscode ist ungültig.
              </p>
              <TimedRedirect href="/" verified={false} />
            </Fragment>
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
};

export default Verify;
