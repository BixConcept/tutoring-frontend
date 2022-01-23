import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import css from "../styles/Find.module.scss";
import lottie from "lottie-web";

export default function Find() {
  document.title = "Registrieren";
  return (
    <div className={css.container}>
      <h1>Anmelden</h1>
      <p>
        Gebe deine Email Adresse an, welche du von der Schule bekommen hast.
      </p>
      <div className={css["inputFields"]}>
        <form action="">
          <div className={css.inputField}>
            <input type="text" />
            <p id={css.gymhaanPlacehodler}>@gymhaan.de</p>
          </div>

          <input type="submit" value="Weiter" id={css.submit} />
        </form>
      </div>
      <div className={css.placeholder}></div>
      <p className={css.step}>Schritt 1 / 3</p>
    </div>
  );
}
