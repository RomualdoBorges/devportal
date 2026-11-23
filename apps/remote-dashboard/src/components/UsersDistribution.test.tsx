
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UsersDistribution } from "./UsersDistribution";

/**
 * Testes do componente de distribuição de usuários.
 *
 * Verificam os percentuais exibidos e os
 * atributos de acessibilidade das barras.
 */
describe("UsersDistribution", () => {
  /**
   * Cenário 1:
   * Três usuários ativos e um inativo.
   */
  it("exibe corretamente 75% ativos e 25% inativos", () => {
    render(<UsersDistribution active={3} inactive={1} />);

    expect(screen.getByText("Ativos: 3 (75.00%)")).toBeInTheDocument();

    expect(screen.getByText("Inativos: 1 (25.00%)")).toBeInTheDocument();

    expect(
      screen.getByRole("progressbar", { name: "Usuários ativos" }),
    ).toHaveAttribute("aria-valuenow", "75");

    expect(
      screen.getByRole("progressbar", { name: "Usuários inativos" }),
    ).toHaveAttribute("aria-valuenow", "25");
  });

  /**
   * Cenário 2:
   * Todos os usuários estão ativos.
   */
  it("exibe 100% quando todos os usuários estão ativos", () => {
    render(<UsersDistribution active={4} inactive={0} />);

    expect(screen.getByText("Ativos: 4 (100.00%)")).toBeInTheDocument();

    expect(screen.getByText("Inativos: 0 (0.00%)")).toBeInTheDocument();

    expect(
      screen.getByRole("progressbar", { name: "Usuários ativos" }),
    ).toHaveAttribute("aria-valuenow", "100");
  });

  /**
   * Cenário 3:
   * Nenhum usuário cadastrado.
   *
   * Garante que o cálculo não produza NaN
   * por uma divisão por zero.
   */
  it("exibe 0% quando não existem usuários", () => {
    render(<UsersDistribution active={0} inactive={0} />);

    expect(screen.getByText("Ativos: 0 (0.00%)")).toBeInTheDocument();

    expect(screen.getByText("Inativos: 0 (0.00%)")).toBeInTheDocument();

    expect(
      screen.getByRole("progressbar", { name: "Usuários ativos" }),
    ).toHaveAttribute("aria-valuenow", "0");

    expect(
      screen.getByRole("progressbar", { name: "Usuários inativos" }),
    ).toHaveAttribute("aria-valuenow", "0");
  });
});
