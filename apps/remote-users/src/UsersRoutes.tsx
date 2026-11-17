import { Route, Routes } from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import NewUserPage from "./pages/NewUserPage";
import UserDetailsPage from "./pages/UserDetailsPage";

/**
 * Define as rotas internas do microfrontend de Usuários.
 *
 * O Host controla /usuarios/* e delega as rotas
 * restantes ao Remote Users.
 *
 * Este componente não cria um BrowserRouter,
 * pois utiliza o contexto do roteador que o envolve.
 */
export default function UsersRoutes() {
  return (
    <Routes>
      <Route index element={<UsersPage />} />
      <Route path="novo" element={<NewUserPage />} />
      <Route path=":id" element={<UserDetailsPage />} />
    </Routes>
  );
}
