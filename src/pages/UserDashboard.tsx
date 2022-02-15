import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_HOST } from "..";
import Alert from "../Components/Alert";
import LoadingScreen from "../Components/LoadingScreen";
import { OurContext } from "../OurContext";
import general from "../styles/general.module.scss";
import css from "../styles/userDashboard.module.scss";

const UserDashboard = (): JSX.Element => {
  document.title = "Dashboard";

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [emailModalVisible, setEmailModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [allowed, setAllowed] = useState<boolean>(true);
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
        setAllowed(true);
      })
      .catch((e) => {
        // navigate("/login");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (allowed) {
    return (
      <div className={css.dashboard}>
        <div className={css["dashboard-content"]}>
          <h1>Dashboard</h1>
          <h4>Meine Fächer</h4>
          <i>Coming soon...</i>

          <h4>Danger Zone</h4>
          <div className={css["danger-zone"]}>
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
              className={css["modal-background"]}
              style={{ display: modalVisible ? "flex" : "none" }}
            >
              <div className={css["modal-content"]} onClick={() => {}}>
                <div className={css["modal-heading-row"]}>
                  <h1>Account löschen</h1>
                  <button
                    onClick={() => setModalVisible(false)}
                    className={css["close-button"]}
                  >
                    &times;
                  </button>
                </div>
                <hr />
                <p>Diese Aktion ist ir­re­ver­si­bel!</p>
                <p>
                  Bitte gib zum Bestätigen{" "}
                  <span className={css.name}>{context.user?.name}</span>ein.
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
                          context.theme
                        );
                      } else {
                        Alert("Account gelöscht.", "info", context.theme);
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
                  Ändere deine E-Mail, wenn du eine eigene benutzen willst.
                </p>
              </div>
              <button
                onClick={(e) => {
                  setEmailModalVisible(!emailModalVisible);
                }}
                className={general["text-button"]}
              >
                E-Mail ändern
              </button>
            </div>
            <div
              className={css["modal-background"]}
              style={{ display: emailModalVisible ? "flex" : "none" }}
            >
              <div className={css["modal-content"]} onClick={() => {}}>
                <div className={css["modal-heading-row"]}>
                  <h1>E-Mail ändern</h1>
                  <button
                    onClick={() => setEmailModalVisible(false)}
                    className={css["close-button"]}
                  >
                    &times;
                  </button>
                </div>
                <hr />
                <p>
                  Bitte gib zum Bestätigen{" "}
                  <span className={css.name}>{context.user?.name}</span>ein.
                </p>

                {/* this form is there so the user can submit via pressing escape or the key on their mobile keyboard */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO
                    fetch(`${API_HOST}/user`, {
                      method: "PUT",
                      credentials: "include",
                      body: JSON.stringify({ email }),
                      headers: { "content-type": "application/json" },
                    }).then(async (res) => {
                      const body = await res.json();
                      if (!res.ok) {
                        Alert(
                          `Irgendwas ist schief gegangen: ${body.msg}`,
                          "error",
                          context.theme
                        );
                      } else {
                        Alert("E-Mail geändert!", "success", context.theme);
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
                    required
                  />
                  <input
                    type="text"
                    placeholder=" Neue E-Mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <input
                    type="submit"
                    value="Ändern"
                    disabled={
                      name !== context.user?.name ||
                      !/\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i.test(email)
                    }
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <LoadingScreen loaded={allowed} />;
};

export default UserDashboard;
