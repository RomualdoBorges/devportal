import { Link } from "react-router-dom";
import { mockUsers } from "../mocks/users";

/**
 * Página de listagem pertencente ao Remote Users.
 *
 * A navegação utiliza caminhos relativos ao módulo,
 * permitindo que o Host mantenha a responsabilidade
 * pela rota principal /usuarios.
 */
export default function UsersPage() {
  return (
    <section>
      <h2>Gerenciamento de Usuários</h2>

      <p>Consulte os usuários cadastrados no portal.</p>

      <Link to="novo">Cadastrar usuário</Link>

      <ul>
        {mockUsers.map((user) => (
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
