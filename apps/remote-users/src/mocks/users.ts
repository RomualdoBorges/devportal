/**
 * Representa um usuário do portal.
 *
 * O tipo será reutilizado pelas páginas de listagem,
 * cadastro e detalhes para manter consistência.
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Dados simulados utilizados pelo Remote Users.
 *
 * Nesta etapa não existe comunicação com uma API.
 * Posteriormente, poderemos adicionar gerenciamento
 * de estado sem alterar o contrato dos usuários.
 */
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana@devportal.com",
  },
  {
    id: 2,
    name: "Carlos Souza",
    email: "carlos@devportal.com",
  },
  {
    id: 3,
    name: "Mariana Costa",
    email: "mariana@devportal.com",
  },
];
