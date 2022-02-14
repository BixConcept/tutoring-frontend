import css from "../styles/cookie.module.scss";
import general from "../styles/general.module.scss";

const Cookie = (props: {
  visible: boolean;
  // this is called when the consent type changes, not just if the user actually consents
  // use a better name if you can think of one
  onConsent: (status: boolean) => void;
}): JSX.Element => {
  return (
    <div
      className={css["modal-background"]}
      style={{ display: props.visible ? "flex" : "none" }}
    >
      <div className={css["modal-content"]}>
        <div className={css["modal-heading-row"]}>
          <h2 className={general.text_marker}>Cookies</h2>
        </div>
        <div id={css.content}>
          <p>Wir verwenden Cookies, um (Laurens fueg einen guten Text ein) </p>
        </div>
        <div className={css.buttonsArea}>
          <button onClick={() => props.onConsent(false)}>Ablehnen</button>
          <button onClick={() => props.onConsent(true)}>Akzeptieren</button>
        </div>
      </div>
    </div>
  );
};

export default Cookie;
