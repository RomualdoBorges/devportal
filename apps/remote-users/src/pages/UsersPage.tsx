import { Link } from "react-router-dom";
import { useUsers } from "../contexts/UsersContext";
import { useMemo, useState } from "react";

/**
 * Página de listagem pertencente ao Remote Users.
 *
 * A navegação utiliza caminhos relativos ao módulo,
 * permitindo que o Host mantenha a responsabilidade
 * pela rota principal /usuarios.
 */
export default function UsersPage() {
  // Obtém a lista de usuários do estado compartilhado.
  // O contexto é gerenciado pelo UsersProvider.
  const { users } = useUsers();

  // Armazena o texto digitado no campo de busca.
  const [search, setSearch] = useState("");

  // Memoriza a lista filtrada.
  // O cálculo é refeito apenas quando users ou search mudarem.
  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term),
    );
  }, [users, search]);

  return (
    <section>
      <h2>Gerenciamento de Usuários</h2>

      <p>Consulte os usuários cadastrados no portal.</p>

      <Link to="novo">Cadastrar usuário</Link>

      <div>
        <label htmlFor="search-users">Buscar usuários</label>

        <input
          id="search-users"
          type="search"
          placeholder="Digite um nome ou e-mail"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Link to={String(user.id)}>{user.name}</Link>
            {" — "}
            {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
}
