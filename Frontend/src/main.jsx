import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="4303499203-ibsjprpandn12nkh21eg1nrf8inb1f4c.apps.googleusercontent.com">
      <App/>
      </GoogleOAuthProvider>

    </BrowserRouter>
  </StrictMode>
);
