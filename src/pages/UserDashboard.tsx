import { useState, Fragment, useContext } from "react";
import Page from "../Components/Page";
import { OurContext } from "../OurContext";
import css from "../styles/userDashboard.module.scss";
import general from "../styles/general.module.scss";

const UserDashboard = (): JSX.Element => {
  document.title = "Dashboard";

  const [content, setContent] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const context = useContext(OurContext);

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
              <hr />
              <p>Diese Aktion ist ir­re­ver­si­bel!</p>
              <p>Bitte gib zum Bestätigen {context.user?.email}</p>
              <input
                type="text"
                placeholder=""
                onChange={(e) => {
                  // todo
                  setName(e.target.value);
                }}
              />
              <button disabled={name === context.user?.email ? false : true}>
                Löschen
              </button>
            </div>
          </div>
        </Fragment>
      );
    } else return <></>;
  };

  const SideButton = (props: { title: string; index: number }): JSX.Element => {
    const { title, index } = props;
    return (
      <button
        className={general["text_button"]}
        onClick={() => setContent(index)}
      >
        {title}
      </button>
    );
  };

  return (
    <div id={css.dashboard}>
      <Page title={"Dashboard"}>
        <div id={css.dashboard_side}>
          <SideButton title="Fächer ändern" index={0} />
          <br />
          <SideButton title="Account löschen" index={1} />
        </div>
        <div className={css.dashboard}>
          <DashboardContent state={content} />
        </div>
      </Page>
    </div>
  );
};

export default UserDashboard;
