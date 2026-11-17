import { lazy, Suspense } from "react";

/**
 * Carregamento dinâmico do microfrontend de Usuários.
 *
 * React.lazy permite carregar o componente remoto
 * apenas quando ele for necessário.
 *
 * O Module Federation resolve o módulo através
 * do remoteEntry.js configurado no Vite.
 */
const UsersPage = lazy(() => import("remote_users/UsersPage"));

export default function App() {
  return (
    <main style={{ padding: "32px", fontFamily: "Arial" }}>
      <header>
        <h1>DevPortal — Host</h1>
        <p>Plataforma corporativa com Microfrontends</p>
      </header>

      <hr />

      <Suspense fallback={<p>Carregando microfrontend de Usuários...</p>}>
        <UsersPage />
      </Suspense>
    </main>
  );
}
