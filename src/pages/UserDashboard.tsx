import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_HOST } from "..";
import Alert from "../Components/Alert";
import { OurContext } from "../OurContext";
import general from "../styles/general.module.scss";
import css from "../styles/userDashboard.module.scss";

const UserDashboard = (): JSX.Element => {
  document.title = "Dashboard";

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const context = useContext(OurContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_HOST}/user`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((body) => {
        context.setUser(body.content);
      })
      .catch((e) => {
        navigate("/login");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getTheme(): "dark" | "light" {
    console.log(context.theme);
    if (context.theme === "dark" || context.theme === "light") {
      return context.theme;
    } else {
      return "dark";
    }
  }

  return (
    <div id={css.dashboard}>
      <div id={css["dashboard-content"]}>
        <h1>Dashboard</h1>
        <h4>Meine Fächer</h4>
        <i>Coming soon...</i>

        <h4>Danger Zone</h4>
        <div id={css["danger-zone"]}>
          <div className={css["danger-item"]}>
            <div>
              <p className={css["danger-action"]}>Diesen Account löschen</p>
              <p className={css["danger-description"]}>
                Sobald du deinen Account gelöscht hast, wirst du nicht mehr in
                der Suche angezeigt und kannst nicht mehr darauf zugreifen.
              </p>
            </div>
            <button
              onClick={(e) => setModalVisible(!modalVisible)}
              className={general["text-button"]}
            >
              Account löschen
            </button>
          </div>
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
              <p>
                Bitte gib zum Bestätigen{" "}
                <span id={css.name}>{context.user?.name}</span> ein.
              </p>
              {/* this form is there so the user can submit via pressing escape or the key on their mobile keyboard */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetch(`${API_HOST}/user`, {
                    method: "DELETE",
                    credentials: "include",
                  }).then((res) => {
                    if (!res.ok) {
                      Alert(
                        "Irgendwas ist schiefgegangen.",
                        "error",
                        getTheme()
                      );
                    } else {
                      Alert("Account gelöscht.", "info", getTheme());
                    }
                  });
                }}
              >
                <input
                  type="text"
                  placeholder=""
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  type="submit"
                  value="Löschen"
                  disabled={name !== context.user?.name}
                />
              </form>
            </div>
          </div>
          <hr />
          <div className={css["danger-item"]}>
            <div>
              <p className={css["danger-action"]}>E-Mail ändern</p>
              <p className={css["danger-description"]}>
                Joah keine Ahnung du musst halt ne andere E-Mail benutzen.
              </p>
            </div>
            <button
              onClick={(e) => setModalVisible(!modalVisible)}
              className={general["text-button"]}
              disabled
            >
              E-Mail ändern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
