import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { UsersProvider, useUsers } from "./UsersContext";

// Componente auxiliar que consome o contexto.
function TestComponent() {
  const { users, addUser } = useUsers();

  function handleAddUser() {
    addUser({
      id: 99,
      name: "Usuário Teste",
      email: "teste@devportal.com",
    });
  }

  return (
    <div>
      <span data-testid="users-count">{users.length}</span>

      <button onClick={handleAddUser}>Adicionar usuário</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Remove os componentes renderizados após cada teste.
// Garante que um teste não interfira no próximo.
afterEach(() => {
  cleanup();
});

describe("UsersContext", () => {
  it("deve disponibilizar os usuários iniciais", () => {
    // Renderiza o componente dentro do Provider.
    render(
      <UsersProvider>
        <TestComponent />
      </UsersProvider>,
    );

    // O mock inicial possui três usuários.
    expect(screen.getByTestId("users-count").textContent).toBe("3");

    expect(screen.getByText("Ana Silva")).toBeTruthy();
    expect(screen.getByText("Carlos Souza")).toBeTruthy();
    expect(screen.getByText("Mariana Costa")).toBeTruthy();
  });

  it("deve atualizar o estado ao adicionar um usuário", () => {
    render(
      <UsersProvider>
        <TestComponent />
      </UsersProvider>,
    );

    // Simula o clique no botão.
    fireEvent.click(screen.getByRole("button", { name: "Adicionar usuário" }));

    // Verifica se o contexto atualizou a lista.
    expect(screen.getByTestId("users-count").textContent).toBe("4");

    expect(screen.getByText("Usuário Teste")).toBeTruthy();
  });
});
