import { useState, Fragment } from "react";
import css from "../styles/userDashboard.module.scss";
import Page from "../Components/Page";

const UserDashboard = (): JSX.Element => {
  document.title = "Dashboard";

  const [content, setContent] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const DashboardContent = (props: { state: number }): JSX.Element => {
    const { state } = props;
    if (state === 0) {
      return <h1>Fächer ändern</h1>;
    } else if (state === 1) {
      return (
        <Fragment>
          <h1>Account löschen</h1>
          <button
            onClick={(e) => setModalVisible(!modalVisible)}
            className={css.button}
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
              <p>Bitte gib zum Bestätigen {"name"}</p>
              <input
                type="text"
                placeholder=""
                onChange={(e) => {
                  // todo
                }}
              />
              <button disabled={name === "asdf" ? false : true}>Löschen</button>
            </div>
          </div>
        </Fragment>
      );
    } else return <></>;
  };

  const SideButton = (props: { title: string; index: number }): JSX.Element => {
    const { title, index } = props;
    return (
      <button className={css.button} onClick={() => setContent(index)}>
        {title}
      </button>
    );
  };

  return (
    <Page title={"Dashboard"}>
      <div>
        <SideButton title="Fächer ändern" index={0} />
        <br />
        <SideButton title="Account löschen" index={1} />
      </div>
      <div className={css.dashboard}>
        <DashboardContent state={content} />
      </div>
    </Page>
  );
};

export default UserDashboard;
