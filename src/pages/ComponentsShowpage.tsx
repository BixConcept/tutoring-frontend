import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import css from "../styles/general.module.scss";
import lottie from "lottie-web";

export default function ComponentsShowpage() {
  const container = useRef(null);

  return (
    <div>
      <select name="Stufe auswählen" id="" className={css.dropdown}>
        <option value="" selected disabled>
          Stufe auswählen
        </option>
        <option value="">6</option>
        <option value="">7</option>
        <option value="">8</option>
        <option value="">9</option>
      </select>

      <button className={css.text_button}>Was läuft</button>

      <div className={css.login}>
        <div className={css.form}>
          <form action="">
            <div className={"text_field"}>
              <input type="text" />
              <label htmlFor="">Name</label>
            </div>

            <div className={"text_field email_text_field"}>
              <input type="email" />
              <label htmlFor="">E-Mail</label>
            </div>

            <div className={"text_field password_text_field"}>
              <input type="password" />
              <label htmlFor="">Passwort</label>
            </div>

            <input type="submit" className={css.submit_button} value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}
