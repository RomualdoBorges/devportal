import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardRoutes from "./DashboardRoutes";

/**
 * Renderiza o Dashboard com um roteador em memória.
 *
 * Não depende do Host nem de um navegador real.
 * A rota "/" corresponde ao index de DashboardRoutes.
 */
function renderDashboard() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <DashboardRoutes />
    </MemoryRouter>,
  );
}

describe("DashboardRoutes", () => {
  /**
   * Verifica a renderização da página principal.
   */
  it("exibe o título e a descrição do Dashboard", () => {
    renderDashboard();

    expect(
      screen.getByRole("heading", {
        name: "Dashboard",
        level: 2,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Visão geral dos indicadores do DevPortal."),
    ).toBeInTheDocument();
  });

  /**
   * Confirma os indicadores calculados com useMemo.
   */
  it("exibe os quatro indicadores corretamente", () => {
    renderDashboard();

    /**
     * Localiza cada Card pelo título.
     *
     * O cast para HTMLElement é necessário porque
     * closest() retorna Element | null, enquanto
     * within() espera um HTMLElement.
     */
    const totalCard = screen
      .getByRole("heading", { name: "Total de usuários" })
      .closest<HTMLElement>(".devportal-card");

    const activeCard = screen
      .getByRole("heading", { name: "Usuários ativos" })
      .closest<HTMLElement>(".devportal-card");

    const inactiveCard = screen
      .getByRole("heading", { name: "Usuários inativos" })
      .closest<HTMLElement>(".devportal-card");

    const activityCard = screen
      .getByRole("heading", { name: "Taxa de atividade" })
      .closest<HTMLElement>(".devportal-card");

    // Confirma que todos os Cards existem.
    expect(totalCard).not.toBeNull();
    expect(activeCard).not.toBeNull();
    expect(inactiveCard).not.toBeNull();
    expect(activityCard).not.toBeNull();

    // Verifica os valores dos indicadores.
    expect(within(totalCard!).getByText("4")).toBeInTheDocument();

    expect(within(activeCard!).getByText("3")).toBeInTheDocument();

    expect(within(inactiveCard!).getByText("1")).toBeInTheDocument();

    expect(within(activityCard!).getByText("75.00%")).toBeInTheDocument();
  });

  /**
   * Verifica a integração com UsersDistribution.
   */
  it("exibe o gráfico com os percentuais corretos", () => {
    renderDashboard();

    expect(
      screen.getByRole("heading", {
        name: "Distribuição de usuários",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("progressbar", {
        name: "Usuários ativos",
      }),
    ).toHaveAttribute("aria-valuenow", "75");

    expect(
      screen.getByRole("progressbar", {
        name: "Usuários inativos",
      }),
    ).toHaveAttribute("aria-valuenow", "25");
  });
});
