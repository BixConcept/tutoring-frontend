import { Fragment, useState } from "react";
import css from "../styles/dashboard.module.scss";

function UserDashboard() {
  document.title = "Einstellungen";
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");

  return (
    <Fragment>
      <ul id={css["settings-menu"]}>
        <li>
          Personenbezogene Daten
        </li>
      <li>
          Fächer ändern
      </li>
      </ul>
    <div id={css["dashboard"]}>
      
      <h1>Einstellungen</h1>
      <button>Fächer ändern</button>
      <h2>Account löschen</h2>
      <button onClick={(e) => setModalVisible(!modalVisible)}>Löschen</button>
      <div
        id={css["modal-background"]}
        style={{ display: modalVisible ? "flex" : "none" }}
      >
        <div id={css["modal-content"]} onClick={() => {}}>
          <div id={css["modal-heading-row"]}>
            <h1>Account löschen</h1>
            <button
              onClick={() => setModalVisible(false)}
              id={css["close-button"]}
            >
              &times;
            </button>
          </div>
          <p>Diese Aktion ist ir­re­ver­si­bel!</p>
          <p>Bitte gib zum Bestätigen {"name"}</p>
          <input
            type="text"
            placeholder=""
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button disabled={name === "asdf" ? false : true}>Löschen</button>
        </div>
      </div>
    </div>
    </Fragment>

  );
}

export default UserDashboard;
