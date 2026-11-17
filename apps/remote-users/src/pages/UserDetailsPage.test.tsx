import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UsersProvider } from "../contexts/UsersContext";
import UserDetailsPage from "./UserDetailsPage";
import UsersPage from "./UsersPage";

// Remove os componentes renderizados após cada teste.
afterEach(() => {
  cleanup();
});

// Renderiza as rotas simulando o módulo de usuários.
// O ID é informado pela URL, como acontece na aplicação real.
function renderUserDetailsPage(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/usuarios/${id}`]}>
      <UsersProvider>
        <Routes>
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/usuarios/:id" element={<UserDetailsPage />} />
        </Routes>
      </UsersProvider>
    </MemoryRouter>,
  );
}

describe("UserDetailsPage", () => {
  it("deve exibir os dados de um usuário existente", () => {
    renderUserDetailsPage("1");

    // Verifica o título da página.
    expect(
      screen.getByRole("heading", {
        name: "Detalhes do usuário",
      }),
    ).toBeTruthy();

    // Confirma que os dados do usuário foram exibidos.
    expect(screen.getByText("Ana Silva")).toBeTruthy();
    expect(screen.getByText("ana@devportal.com")).toBeTruthy();

    // Verifica o identificador apresentado.
    expect(screen.getByText("1")).toBeTruthy();
  });

  it("deve informar quando o usuário não existe", () => {
    renderUserDetailsPage("999");

    // O ID 999 não existe nos dados simulados.
    expect(
      screen.getByRole("heading", {
        name: "Usuário não encontrado",
      }),
    ).toBeTruthy();

    expect(
      screen.getByText("Não encontramos um usuário com esse identificador."),
    ).toBeTruthy();
  });

  it("deve retornar à listagem ao clicar em voltar", () => {
    renderUserDetailsPage("1");

    // Simula o clique no link de retorno.
    fireEvent.click(
      screen.getByRole("link", {
        name: "Voltar para usuários",
      }),
    );

    // Confirma que a listagem foi apresentada.
    expect(
      screen.getByRole("heading", {
        name: "Gerenciamento de Usuários",
      }),
    ).toBeTruthy();
  });
});
