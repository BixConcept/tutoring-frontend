import css from "../styles/cookie.module.scss";
import general from "../styles/general.module.scss";
import { useContext, useState, useEffect } from "react";
import { OurContext } from "../OurContext";
import kruemmelmonster from "../assets/images/kruemmelmonster.webp";

const Cookie = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  useEffect(() => {
	if (localStorage) {
		let val = localStorage.getItem("cookiesAllowed");
		if (val === "true" || val === "false") {
		setModalVisible(false);
		}
	}
  }, [
  ]);

  const handleSubmit = (n: number): void => {
    setModalVisible(false);
    if (n === 0) {
        localStorage.setItem("cookiesAllowed", "false");
    } else {
       localStorage.setItem("cookiesAllowed", "true");
    }
  };

  return (
    <div
      className={css["modal-background"]}
      style={{ display: modalVisible ? "flex" : "none" }}
    >
      <div className={css["modal-content"]}>
        <div className={css["modal-heading-row"]}>
          <h2 className={general.text_marker}>Cookies</h2>
        </div>
        <div id={css.content}>
          <p>Wir verwenden Cookies, um (Laurens fueg einen guten Text ein) </p>
        </div>
        <div className={css.buttonsArea}>
          <button onClick={(e) => handleSubmit(0)}>Ablehnen</button>
          <button onClick={(e) => handleSubmit(1)}>Akzeptieren</button>
        </div>
      </div>
    </div>
  );
};

export default Cookie;
