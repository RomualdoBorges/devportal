import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

/**
 * O BrowserRouter é criado somente na execução
 * independente do Remote Users.
 *
 * Quando integrado ao Host, apenas UsersRoutes
 * é importado, utilizando o contexto do Host.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/usuarios">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
