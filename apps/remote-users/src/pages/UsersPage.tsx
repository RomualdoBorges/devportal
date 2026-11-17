/**
 * Página de Usuários exposta pelo Module Federation.
 *
 * Este componente pertence ao Remote de Usuários
 * e poderá ser carregado pelo Host dinamicamente.
 */
export default function UsersPage() {
  const users = [
    { id: 1, name: "Ana Silva", email: "ana@devportal.com" },
    { id: 2, name: "Carlos Souza", email: "carlos@devportal.com" },
    { id: 3, name: "Mariana Costa", email: "mariana@devportal.com" },
  ];

  return (
    <section>
      <h1>Gerenciamento de Usuários</h1>
      <p>Microfrontend de Usuários carregado com Module Federation.</p>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
}
