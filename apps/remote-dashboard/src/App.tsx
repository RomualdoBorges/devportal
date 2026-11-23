import DashboardRoutes from "./DashboardRoutes";

/**
 * Aplicação independente do Remote Dashboard.
 *
 * Reutiliza as mesmas rotas disponibilizadas
 * ao Host pelo Module Federation.
 */
export default function App() {
  return (
    <main style={{ padding: "32px", fontFamily: "Arial" }}>
      <header>
        <h1>DevPortal — Remote Dashboard</h1>
        <p>Microfrontend de indicadores e métricas</p>
      </header>

      <hr />

      <DashboardRoutes />
    </main>
  );
}
