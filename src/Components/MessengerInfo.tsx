import { faDiscord, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import css from "../styles/messengerInfo.module.scss";
import Signal from "../assets/images/signal.svg";

export function MessengerInfo(props: {
  hasDiscord: boolean;
  hasWhatsapp: boolean;
  hasSignal: boolean;
  discordUser: string;
  phoneNumber: string | null;
}) {
  return (
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
              <img src={Signal} alt="Signal" />
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
  );
}
