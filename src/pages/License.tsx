import Page from "../Components/Page";
import { useState, useEffect } from "react";
import css from "../styles/license.module.scss";

function License() {
  const [content, setContent] = useState("");

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
        setContent(e.replace("\n", "\n\n"));
      });
  }, []);
  return (
    <div>
      <Page title="Lizenz" center={true}>
        <pre id={css.licenseText}>{content}</pre>
      </Page>
    </div>
  );
}

export default License;
