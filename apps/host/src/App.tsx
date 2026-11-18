import { lazy, Suspense } from "react";
import { Badge, Button, Card } from "@devportal/ui";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

/**
 * Carrega dinamicamente o conjunto de rotas
 * pertencente ao microfrontend de Usuários.
 */
const UsersRoutes = lazy(() => import("remote_users/UsersRoutes"));

/**
 * Página inicial pertencente ao Host.
 *
 * Demonstra a reutilização dos componentes
 * compartilhados entre microfrontends.
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

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate("/usuarios")}>
          Acessar usuários
        </Button>
      </Card>
    </section>
  );
}

export default function App() {
  return (
    <main style={{ padding: "32px", fontFamily: "Arial" }}>
      <header>
        <h1>DevPortal</h1>
        <p>Portal corporativo — FIAP Pós-Tech</p>

        {/*
          Link permite navegação sem recarregar
          toda a aplicação no navegador.
        */}
        <nav style={{ display: "flex", gap: "16px" }}>
          <Link to="/">Início</Link>
          <Link to="/usuarios">Usuários</Link>
        </nav>
      </header>

      <hr />

      {/*
        Suspense apresenta um fallback enquanto
        o módulo remoto está sendo carregado.
      */}
      <Suspense fallback={<p>Carregando microfrontend...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios/*" element={<UsersRoutes />} />
        </Routes>
      </Suspense>
    </main>
  );
}
