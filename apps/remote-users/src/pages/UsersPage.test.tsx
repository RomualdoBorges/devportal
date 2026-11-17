import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UsersProvider } from "../contexts/UsersContext";
import UsersPage from "./UsersPage";

// Remove os componentes renderizados após cada teste.
afterEach(() => {
  cleanup();
});

// Renderiza a página com as dependências necessárias.
// UsersProvider disponibiliza o estado compartilhado.
// MemoryRouter permite testar os links sem um navegador real.
function renderUsersPage() {
  return render(
    <MemoryRouter initialEntries={["/usuarios"]}>
      <UsersProvider>
        <UsersPage />
      </UsersProvider>
    </MemoryRouter>,
  );
}

describe("UsersPage", () => {
  it("deve exibir os usuários cadastrados inicialmente", () => {
    renderUsersPage();

    // Verifica o título da página.
    expect(
      screen.getByRole("heading", {
        name: "Gerenciamento de Usuários",
      }),
    ).toBeTruthy();

    // Verifica os usuários carregados do mock.
    expect(screen.getByText("Ana Silva")).toBeTruthy();
    expect(screen.getByText("Carlos Souza")).toBeTruthy();
    expect(screen.getByText("Mariana Costa")).toBeTruthy();
  });

  it("deve filtrar usuários pelo nome", () => {
    renderUsersPage();

    // Localiza o campo de busca.
    const searchInput = screen.getByRole("searchbox", {
      name: "Buscar usuários",
    });

    // Pesquisa pelo nome completo para evitar
    // correspondências parciais com outros usuários.
    fireEvent.change(searchInput, {
      target: { value: "Ana Silva" },
    });

    // Apenas Ana Silva deve permanecer na listagem.
    expect(screen.getByText("Ana Silva")).toBeTruthy();
    expect(screen.queryByText("Carlos Souza")).toBeNull();
    expect(screen.queryByText("Mariana Costa")).toBeNull();
  });

  it("deve filtrar usuários pelo e-mail", () => {
    renderUsersPage();

    const searchInput = screen.getByRole("searchbox", {
      name: "Buscar usuários",
    });

    // Busca pelo e-mail de Carlos.
    fireEvent.change(searchInput, {
      // Pesquisa por um trecho exclusivo do e-mail.
      target: { value: "carlos@devportal.com" },
    });

    expect(screen.getByText("Carlos Souza")).toBeTruthy();
    expect(screen.queryByText("Ana Silva")).toBeNull();
    expect(screen.queryByText("Mariana Costa")).toBeNull();
  });

  it("deve exibir todos os usuários ao limpar a busca", () => {
    renderUsersPage();

    const searchInput = screen.getByRole("searchbox", {
      name: "Buscar usuários",
    });

    // Primeiro aplica um filtro.
    fireEvent.change(searchInput, {
      target: { value: "Ana" },
    });

    expect(screen.queryByText("Carlos Souza")).toBeNull();

    // Depois limpa o campo de busca.
    fireEvent.change(searchInput, {
      target: { value: "" },
    });

    // Todos os usuários devem voltar a aparecer.
    expect(screen.getByText("Ana Silva")).toBeTruthy();
    expect(screen.getByText("Carlos Souza")).toBeTruthy();
    expect(screen.getByText("Mariana Costa")).toBeTruthy();
  });
});
