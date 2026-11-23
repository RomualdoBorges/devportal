import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

/**
 * O BrowserRouter é criado somente quando
 * o Dashboard é executado independentemente.
 *
 * O basename mantém suas rotas sob /dashboard.
 *
 * Quando o Host carrega DashboardRoutes via
 * Module Federation, utiliza seu próprio Router.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/dashboard">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
