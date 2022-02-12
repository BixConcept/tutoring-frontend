import { useState, Fragment, useEffect, useContext } from "react";
import css from "../styles/userDashboard.module.scss";
import general from "../styles/general.module.scss";
import Page from "../Components/Page";
import { API_HOST } from "..";
import { OurContext } from "../OurContext";
import { useNavigate } from "react-router";
import Alert from "../Components/Alert";

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
        <h2>Account löschen</h2>
        <button
          onClick={(e) => setModalVisible(!modalVisible)}
          className={general["text-button"]}
        >
          Löschen
        </button>
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
                    Alert("Irgendwas ist schiefgegangen.", "error", getTheme());
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
      </div>
    </div>
  );
};

export default UserDashboard;
