import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

/**
 * Testes do componente Badge compartilhado.
 *
 * Validam a renderização do conteúdo
 * e a aplicação das variantes visuais.
 */
describe("Badge compartilhado", () => {
  it("renderiza o texto recebido", () => {
    render(<Badge>Ativo</Badge>);

    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  it("aplica a variante success", () => {
    render(<Badge variant="success">Ativo</Badge>);

    const badge = screen.getByText("Ativo");

    expect(badge).toHaveClass("devportal-badge--success");
  });

  it("aplica a variante warning", () => {
    render(<Badge variant="warning">Pendente</Badge>);

    const badge = screen.getByText("Pendente");

    expect(badge).toHaveClass("devportal-badge--warning");
  });

  it("aplica a variante danger", () => {
    render(<Badge variant="danger">Erro</Badge>);

    const badge = screen.getByText("Erro");

    expect(badge).toHaveClass("devportal-badge--danger");
  });
});
