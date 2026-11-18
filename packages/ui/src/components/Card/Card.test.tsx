import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

/**
 * Testes do componente Card compartilhado.
 *
 * Validam a renderização das propriedades
 * e do conteúdo recebido pelo componente.
 */
describe("Card compartilhado", () => {
  it("renderiza o título recebido", () => {
    render(<Card title="Dashboard" />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renderiza a descrição recebida", () => {
    render(<Card description="Visão geral dos indicadores." />);

    expect(
      screen.getByText("Visão geral dos indicadores."),
    ).toBeInTheDocument();
  });

  it("renderiza o conteúdo filho", () => {
    render(
      <Card>
        <p>Conteúdo personalizado</p>
      </Card>,
    );

    expect(screen.getByText("Conteúdo personalizado")).toBeInTheDocument();
  });
});
