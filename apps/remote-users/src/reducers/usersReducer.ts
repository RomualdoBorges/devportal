import type { User } from "../mocks/users";

// Define quais ações podem modificar a lista de usuários.
// O TypeScript garante que cada ação tenha os dados necessários.
export type UsersAction = {
  type: "ADD_USER";
  payload: User;
};

// O reducer recebe o estado atual e uma ação.
// Ele retorna um novo estado, sem modificar o array original.
export function usersReducer(state: User[], action: UsersAction): User[] {
  switch (action.type) {
    case "ADD_USER":
      // Cria um novo array contendo os usuários existentes
      // e o usuário que acabou de ser cadastrado.
      return [...state, action.payload];

    default:
      return state;
  }
}
