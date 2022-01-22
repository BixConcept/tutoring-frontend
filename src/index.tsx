import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";

export const API_HOST = "https://api.hentai.sanberk.xyz";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
