import Logo from "../assets/images/logo.svg";
import css from "../styles/LoadingScreen.module.scss";

function LoadingScreen(props: { s: boolean }) {
  if (!props.s) {
    return (
      <div className={css.LoadingScreen}>
        <div className={css.spinner}>
          <img
            src={Logo}
            className={css.LoadingSpin}
            alt="spin"
            style={{ opacity: props.s ? 0 : 1 }}
          />
        </div>
      </div>
    );
  } else return null;
}

export default LoadingScreen;
