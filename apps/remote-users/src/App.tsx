import UsersRoutes from "./UsersRoutes";

/**
 * Aplicação independente do Remote Users.
 *
 * Reutiliza o mesmo conjunto de rotas que é
 * carregado pelo Host via Module Federation.
 */
export default function App() {
  return (
    <main style={{ padding: "32px", fontFamily: "Arial" }}>
      <header>
        <h1>DevPortal — Remote Users</h1>
        <p>Microfrontend de gerenciamento de usuários</p>
      </header>

      <hr />

      <UsersRoutes />
    </main>
  );
}
