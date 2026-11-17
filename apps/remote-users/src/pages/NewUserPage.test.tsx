import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UsersProvider } from "../contexts/UsersContext";
import NewUserPage from "./NewUserPage";
import UsersPage from "./UsersPage";

// Limpa o DOM depois de cada teste.
afterEach(() => {
  cleanup();
});

// Simula as rotas do Remote Users.
// O Provider fica acima das rotas para preservar o estado
// durante a navegação entre cadastro e listagem.
function renderNewUserPage() {
  return render(
    <MemoryRouter initialEntries={["/usuarios/novo"]}>
      <UsersProvider>
        <Routes>
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/usuarios/novo" element={<NewUserPage />} />
        </Routes>
      </UsersProvider>
    </MemoryRouter>,
  );
}

describe("NewUserPage", () => {
  it("deve exibir os campos do formulário", () => {
    renderNewUserPage();

    // Verifica o título e os campos obrigatórios.
    expect(
      screen.getByRole("heading", {
        name: "Cadastrar usuário",
      }),
    ).toBeTruthy();

    expect(screen.getByRole("textbox", { name: "Nome" })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: "E-mail" })).toBeTruthy();

    expect(screen.getByRole("button", { name: "Cadastrar" })).toBeTruthy();
  });

  it("deve cadastrar um novo usuário no estado compartilhado", () => {
    renderNewUserPage();

    // Preenche os campos controlados do formulário.
    fireEvent.change(screen.getByRole("textbox", { name: "Nome" }), {
      target: { value: "João Oliveira" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: "E-mail" }), {
      target: { value: "joao@devportal.com" },
    });

    // Envia o formulário.
    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    // Após o cadastro, a listagem deve exibir o novo usuário.
    expect(screen.getByText("João Oliveira")).toBeTruthy();
    expect(screen.getByText(/joao@devportal.com/)).toBeTruthy();
  });

  it("deve retornar à listagem após cadastrar", () => {
    renderNewUserPage();

    fireEvent.change(screen.getByRole("textbox", { name: "Nome" }), {
      target: { value: "Pedro Santos" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: "E-mail" }), {
      target: { value: "pedro@devportal.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    // A navegação deve apresentar a página de listagem.
    expect(
      screen.getByRole("heading", {
        name: "Gerenciamento de Usuários",
      }),
    ).toBeTruthy();

    // O formulário não deve mais estar visível.
    expect(screen.queryByRole("button", { name: "Cadastrar" })).toBeNull();
  });
});
