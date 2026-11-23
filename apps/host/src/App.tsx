import { lazy, Suspense } from "react";
import { Badge, Button, Card } from "@devportal/ui";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

/**
 * Carrega os microfrontends somente quando
 * suas respectivas rotas são acessadas.
 */
const UsersRoutes = lazy(() => import("remote_users/UsersRoutes"));

const DashboardRoutes = lazy(() => import("remote_dashboard/DashboardRoutes"));

/**
 * Página inicial pertencente ao Host.
 *
 * Demonstra a reutilização de componentes
 * compartilhados entre os microfrontends.
 */
function HomePage() {
  const navigate = useNavigate();

  return (
    <section>
      <Card
        title="Bem-vindo ao DevPortal"
        description="Plataforma corporativa construída com microfrontends.">
        <div style={{ marginBottom: "16px" }}>
          <Badge variant="success">Portal disponível</Badge>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/usuarios")}>
            Acessar usuários
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/dashboard")}>
            Acessar Dashboard
          </Button>
        </div>
      </Card>
    </section>
  );
}

/**
 * Aplicação principal do DevPortal.
 *
 * O Host controla a navegação e carrega os
 * microfrontends através do Module Federation.
 */
export default function App() {
  return (
    <main style={{ padding: "32px", fontFamily: "Arial" }}>
      <header>
        <h1>DevPortal</h1>
        <p>Portal corporativo — FIAP Pós-Tech</p>

        {/* Navegação sem recarregar a aplicação. */}
        <nav style={{ display: "flex", gap: "16px" }}>
          <Link to="/">Início</Link>
          <Link to="/usuarios">Usuários</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <hr />

      {/*
        Suspense apresenta uma mensagem enquanto
        o microfrontend solicitado é carregado.
      */}
      <Suspense fallback={<p>Carregando microfrontend...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/usuarios/*" element={<UsersRoutes />} />

          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </Suspense>
    </main>
  );
}
