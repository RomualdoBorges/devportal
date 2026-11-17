import { describe, expect, it } from "vitest";
import { usersReducer } from "./usersReducer";
import type { User } from "../mocks/users";

describe("usersReducer", () => {
  it("deve adicionar um novo usuário ao estado", () => {
    // Estado inicial com um usuário cadastrado.
    const initialState: User[] = [
      {
        id: 1,
        name: "Ana Silva",
        email: "ana@devportal.com",
      },
    ];

    // Novo usuário que será adicionado.
    const newUser: User = {
      id: 2,
      name: "Carlos Souza",
      email: "carlos@devportal.com",
    };

    // Executa o reducer com a ação ADD_USER.
    const newState = usersReducer(initialState, {
      type: "ADD_USER",
      payload: newUser,
    });

    // Verifica se o novo usuário foi adicionado.
    expect(newState).toHaveLength(2);
    expect(newState[1]).toEqual(newUser);

    // Garante que o estado original não foi modificado.
    expect(initialState).toHaveLength(1);
  });

  it("deve preservar os usuários existentes ao adicionar outro", () => {
    // Estado inicial com dois usuários.
    const initialState: User[] = [
      { id: 1, name: "Ana Silva", email: "ana@devportal.com" },
      { id: 2, name: "Carlos Souza", email: "carlos@devportal.com" },
    ];

    const newUser: User = {
      id: 3,
      name: "Mariana Costa",
      email: "mariana@devportal.com",
    };

    const newState = usersReducer(initialState, {
      type: "ADD_USER",
      payload: newUser,
    });

    // Confirma que os usuários anteriores foram preservados.
    expect(newState).toEqual([...initialState, newUser]);
  });

  it("não deve modificar a referência do estado original", () => {
    const initialState: User[] = [
      { id: 1, name: "Ana Silva", email: "ana@devportal.com" },
    ];

    const newUser: User = {
      id: 2,
      name: "Carlos Souza",
      email: "carlos@devportal.com",
    };

    const newState = usersReducer(initialState, {
      type: "ADD_USER",
      payload: newUser,
    });

    // O reducer deve produzir um novo array.
    expect(newState).not.toBe(initialState);

    // O array original deve permanecer inalterado.
    expect(initialState).toEqual([
      { id: 1, name: "Ana Silva", email: "ana@devportal.com" },
    ]);
  });

  it("deve retornar o estado original para uma ação desconhecida", () => {
    const initialState: User[] = [
      { id: 1, name: "Ana Silva", email: "ana@devportal.com" },
    ];

    // Simula uma ação desconhecida em tempo de execução.
    // O cast é necessário porque UsersAction aceita apenas ADD_USER.
    const unknownAction = {
      type: "UNKNOWN_ACTION",
    } as unknown as Parameters<typeof usersReducer>[1];

    const newState = usersReducer(initialState, unknownAction);

    // A referência deve ser preservada.
    expect(newState).toBe(initialState);
  });
});
