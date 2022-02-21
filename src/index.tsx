import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";

export const API_HOST = "https://nachhilfe.3nt3.de/api";
// export const API_HOST = "http://localhost:5001";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
