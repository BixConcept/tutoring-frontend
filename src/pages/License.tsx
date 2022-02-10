import Page from "../Components/Page";
import { useState, useEffect } from "react";
import css from "../styles/license.module.scss";
import LoadingScreen from "../Components/LoadingScreen";

function License() {
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/HaanerBarbaren/tutoring-frontend/main/LICENSE"
    )
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((e: any) => {
        setTimeout(() => {
          setLoaded(true);
          setContent(e.replace("\n", "\n\n"));
        }, 300);
      });
  }, []);
  return (
    <div>
      <Page title="Lizenz" center={true}>
        <LoadingScreen loaded={loaded} />
        <pre id={css.licenseText}>{content}</pre>
      </Page>
    </div>
  );
}

export default License;
