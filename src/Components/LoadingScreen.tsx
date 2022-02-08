import Logo from "../assets/images/logo.svg";
import css from "../styles/LoadingScreen.module.scss";

const LoadingScreen = (props: { state: boolean }) => {
  const { state } = props;
  if (!state) {
    return (
      <div className={css.LoadingScreen}>
        <div className={css.spinner}>
          <img
            src={Logo}
            className={css.LoadingSpin}
            alt="spin"
            style={{ opacity: state ? 0 : 1 }}
          />
        </div>
      </div>
    );
  } else return null;
};

export default LoadingScreen;
