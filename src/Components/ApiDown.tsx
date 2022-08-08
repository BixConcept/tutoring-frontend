import css from "../styles/ApiDown.module.scss";
import React from "react";

export default function ApiDown() {
  return (
    <div id={css.banner}>
      <h1>Something went wrong</h1>
      <h2>
        Es kann keine Verbindung zum Backend hergestellt werden. Versuch's
        später nochmal oder kontaktiere Hr. Höltgen
      </h2>
      <p>
        <a href="mailto:hoeltgen@gymhaan.de">hoeltgen@gymhaan.de</a>
      </p>
    </div>
  );
}
