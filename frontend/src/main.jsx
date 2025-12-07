import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextApi from "./context/ContextApi.jsx";
import { Auth0Provider } from "@auth0/auth0-react"; // ✅ ADD THIS
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-mzryk7h1ajypxamg.us.auth0.com"
      clientId="cwgzm7nePUrEwfzC0rjDpNlmywA3VXCY"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <Provider store={store}>
          <ContextApi>
            <App />
          </ContextApi>
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
