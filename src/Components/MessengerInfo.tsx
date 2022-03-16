import { faDiscord, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useContext } from "react";
import css from "../styles/messengerInfo.module.scss";
import Signal from "../assets/images/signal.svg";
import SignalBlack from "../assets/images/signal_black.svg";
import { OurContext } from "../OurContext";

export function MessengerInfo(props: {
  hasDiscord: boolean;
  hasWhatsapp: boolean;
  hasSignal: boolean;
  discordUser: string;
  phoneNumber: string | null;
  iconsOnly?: boolean;
}) {
  const context = useContext(OurContext);
  return !props.iconsOnly ? (
    <Fragment>
      {props.hasDiscord ? (
        <p id={css.discord} className={css.button}>
          {" "}
          {/* this is not actually a button since discord doesn't allow generating DM links from usernames only.

          We'd have to get their ID (which is pretty hard to get especially on mobile) so for now users will just have to copy the username */}
          <FontAwesomeIcon icon={faDiscord} /> {props.discordUser}
        </p>
      ) : null}
      {props.phoneNumber ? (
        <Fragment>
          {props.hasSignal ? (
            <a
              id={css.signal}
              className={css.button}
              href={`https://signal.me/#p/${encodeURIComponent(
                props.phoneNumber
              )}`}
            >
              <img src={Signal} className={css.icon} alt="Signal" />
              Signal
            </a>
          ) : null}
          {props.hasWhatsapp ? (
            <a
              id={css.whatsapp}
              className={css.button}
              href={`https://api.whatsapp.com/send?phone=${encodeURIComponent(
                props.phoneNumber
              )}`}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              &nbsp;WhatsApp
            </a>
          ) : null}
        </Fragment>
      ) : null}
    </Fragment>
  ) : (
    <Fragment>
      {props.hasDiscord ? <FontAwesomeIcon icon={faDiscord} /> : null}
      {props.hasWhatsapp ? <FontAwesomeIcon icon={faWhatsapp} /> : null}
      {props.hasSignal ? (
        <img
          className={css.icon}
          src={context.theme === "dark" ? Signal : SignalBlack}
        />
      ) : null}
    </Fragment>
  );
}
