import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

/**
 * O Host controla o roteamento principal do DevPortal.
 *
 * O BrowserRouter fornece o contexto de navegação
 * para as páginas e para os microfrontends integrados.
 *
 * Os Remotes não devem criar outro BrowserRouter
 * quando executados dentro do Host.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
