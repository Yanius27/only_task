import { createRoot } from "react-dom/client";

import App from "./App";

import "./styles/main.scss";

const cont = document.getElementById("root");

if (!cont) {
  throw new Error("Root element not found");
}

const root = createRoot(cont);
root.render(<App />);
