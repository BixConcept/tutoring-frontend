import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import css from "../styles/Find.module.scss";
import lottie from "lottie-web";

export default function Find() {
  document.title = "Registrieren";
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  if (step === 1) {
    return (
      <div className={css.container}>
        <h1>Anmelden</h1>
        <p>
          Gebe deine Email Adresse an, welche du von der Sdchule bekommen hast.
        </p>
        <div className={css["inputFields"]}>
          <form action="">
            <div className={css.inputField}>
              <input
                type="text"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p id={css.gymhaanPlacehodler}>@gymhaan.de</p>
            </div>

            <input
              type="submit"
              value="Ich bin ein Flachwichser"
              id={css.submit}
              onClick={(e) => {
                setStep(2);
                e.preventDefault();
              }}
            />
          </form>
        </div>
        <div className={css.placeholder}></div>
        <p className={css.step}>Schritt 1 / 3</p>
      </div>
    );
  } else if (step === 2) {
    return (
      <div className={css.container}>
        <h1>Diese E-Mail wurde noch nicht registriert</h1>
        <p>
          Wir haben dir eine E-Mail an {email}@gymhaan.de mit einem
          Registrierungs-Link geschickt.
          <br />
          Überprüfe dein Postfach.
        </p>
      </div>
    );
  } else {
    return <h1>null</h1>;
  }
}
