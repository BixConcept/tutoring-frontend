import "react-toastify/dist/ReactToastify.css";

import { API_HOST, checkEmail } from "../index";
import { useEffect, useRef, useState } from "react";

import Alert from "../Components/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OurContext } from "../OurContext";
import css from "../styles/loginPage.module.scss";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import general from "../styles/general.module.scss";
import lottie from "lottie-web";
import { useContext } from "react";

const Required = (): JSX.Element => {
  return <span className={css.required}></span>;
};

const LoginPage = (): JSX.Element => {
  document.title = "Login";
  const [otpEmail, setOtpEmai] = useState<string>("");
  const [displayAnimation, setDisplayAnimation] = useState(false);

  const context = useContext(OurContext);

  const animationRef = useRef(null);

  function loginOTP() {
    fetch(`${API_HOST}/user/otp`, {
      method: "POST",
      body: JSON.stringify({ email: otpEmail }),
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Path": document.location.pathname,
      },
    }).then((res) => {
      if (res.ok) {
        Alert("E-Mail geschickt!", "success", context.theme);
        lottie.destroy();
        setDisplayAnimation(true);
        setTimeout(() => {
          setDisplayAnimation(false);
        }, 4000);
      } else {
        Alert(
          "Wahrscheinlich stimmt etwas mit deiner Eingabe nicht. Womöglich ist mit dieser E-Mail kein Account verknüpft.",
          "error",
          context.theme
        );
        setDisplayAnimation(false);
      }
      return res.json();
    });
  }

  useEffect(() => {
    if (animationRef.current) {
      lottie.loadAnimation({
        container: animationRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../assets/animations/message.json"),
      });
    }
  }, [displayAnimation]);

  return (
    <div id={css.login}>
      <h1>Login</h1>
      {displayAnimation ? (
        <div id={css.animationContainer} ref={animationRef} />
      ) : null}
      <p>
        Du kriegst einen Link per E-Mail (an deine hinterlegte E-Mail-Adresse)
        zugeschickt, mit dem du dich 30 Tage lang auf einem Gerät
        authentifizieren kannst.{" "}
        <a href="https://outlook.office365.com/mail/">
          Link zu Outlook <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      </p>
      <div className={css["inputFields"]}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginOTP();
          }}
        >
          <label htmlFor="email">
            E-Mail Adresse
            <Required />
          </label>
          <div className={css.inputField}>
            <input
              type="email"
              name="email"
              required
              placeholder="E-Mail"
              value={otpEmail}
              onChange={(e) => setOtpEmai(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Login"
            className={general["text_button"]}
            disabled={!checkEmail(otpEmail)}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
