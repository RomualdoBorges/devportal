import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { Card } from "@devportal/ui";
import { UsersDistribution } from "./components/UsersDistribution";

/**
 * Dados simulados do Dashboard.
 *
 * Futuramente poderão ser substituídos
 * por informações de uma API.
 */
const users = [
  { id: 1, name: "Ana Silva", active: true },
  { id: 2, name: "Carlos Souza", active: true },
  { id: 3, name: "Mariana Costa", active: false },
  { id: 4, name: "Pedro Santos", active: true },
];

/**
 * Página principal do microfrontend Dashboard.
 */
function DashboardPage() {
  /**
   * useMemo evita recalcular os indicadores
   * quando o componente renderiza novamente
   * sem alterações nos dados.
   */
  const metrics = useMemo(() => {
    const total = users.length;

    const active = users.filter((user) => user.active).length;

    const inactive = total - active;

    const activityRate = total > 0 ? (active / total) * 100 : 0;

    return {
      total,
      active,
      inactive,
      activityRate,
    };
  }, []);

  return (
    <section>
      <h2>Dashboard</h2>

      <p>Visão geral dos indicadores do DevPortal.</p>

      {/*
        Grid responsivo para organizar
        os componentes compartilhados.
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}>
        <Card title="Total de usuários">
          <strong style={{ fontSize: "32px" }}>{metrics.total}</strong>
        </Card>

        <Card title="Usuários ativos">
          <strong style={{ fontSize: "32px" }}>{metrics.active}</strong>
        </Card>

        <Card title="Usuários inativos">
          <strong style={{ fontSize: "32px" }}>{metrics.inactive}</strong>
        </Card>

        <Card title="Taxa de atividade">
          <strong style={{ fontSize: "32px" }}>
            {metrics.activityRate.toFixed(2)}%
          </strong>
        </Card>
      </div>

      {/*
        Distribuição de usuários.

        Reutiliza os indicadores calculados pelo
        useMemo, evitando duplicação de lógica.
      */}
      <div style={{ marginTop: "24px" }}>
        <UsersDistribution
          active={metrics.active}
          inactive={metrics.inactive}
        />
      </div>
    </section>
  );
}

/**
 * Rotas internas do microfrontend.
 *
 * O BrowserRouter permanece sob
 * responsabilidade do Host.
 */
export default function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
    </Routes>
  );
}
