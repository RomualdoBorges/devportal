import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

/**
 * Testes unitários do componente Button.
 *
 * Validam sua renderização, interação
 * e comportamento quando desabilitado.
 */
describe("Button compartilhado", () => {
  it("renderiza o texto recebido", () => {
    render(<Button>Salvar</Button>);

    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("executa a função ao clicar", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Salvar</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("não executa o clique quando está desabilitado", () => {
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled>
        Salvar
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Salvar" });

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
