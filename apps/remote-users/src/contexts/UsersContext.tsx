import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

import { mockUsers, type User } from "../mocks/users";
import { usersReducer } from "../reducers/usersReducer";

// Define os dados e as funções disponíveis no contexto.
type UsersContextType = {
  users: User[];
  addUser: (user: User) => void;
};

// Cria o contexto sem um valor inicial.
// O Provider será responsável por fornecer os valores.
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Componente que centraliza o estado dos usuários.
export function UsersProvider({ children }: { children: ReactNode }) {
  // Inicializa o reducer com os usuários simulados.
  const [users, dispatch] = useReducer(usersReducer, mockUsers);

  // Memoriza a função de cadastro entre renderizações.
  // O dispatch do useReducer possui referência estável.
  const addUser = useCallback((user: User) => {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  }, []);

  return (
    <UsersContext.Provider value={{ users, addUser }}>
      {children}
    </UsersContext.Provider>
  );
}

// Hook personalizado para acessar o contexto.
// Evita repetir useContext em cada página.
export function useUsers() {
  const context = useContext(UsersContext);

  // Garante que o hook seja utilizado dentro do Provider.
  if (!context) {
    throw new Error("useUsers deve ser utilizado dentro de UsersProvider");
  }

  return context;
}
