import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

/**
 * Testes do componente Input compartilhado.
 *
 * Validam a renderização, interação com o usuário,
 * mensagens de erro e atributos de acessibilidade.
 */
describe("Input compartilhado", () => {
  it("renderiza o campo associado ao label", () => {
    render(<Input label="Nome completo" />);

    const input = screen.getByRole("textbox", {
      name: "Nome completo",
    });

    expect(input).toBeInTheDocument();
  });

  it("executa onChange quando o usuário digita", () => {
    const handleChange = vi.fn();

    render(<Input label="Nome completo" onChange={handleChange} />);

    const input = screen.getByRole("textbox", {
      name: "Nome completo",
    });

    fireEvent.change(input, {
      target: { value: "Ana Silva" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("Ana Silva");
  });

  it("exibe a mensagem de erro recebida", () => {
    render(<Input label="E-mail" error="E-mail obrigatório" />);

    expect(screen.getByText("E-mail obrigatório")).toBeInTheDocument();
  });

  it("identifica o campo como inválido quando existe erro", () => {
    render(<Input label="E-mail" error="E-mail obrigatório" />);

    const input = screen.getByRole("textbox", {
      name: "E-mail",
    });

    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
