import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/app/App";
import { AppProvider } from "./context/Context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App/>
    </AppProvider>
  </StrictMode>,
);
