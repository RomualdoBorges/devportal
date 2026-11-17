import { Link, useParams } from "react-router-dom";
import { mockUsers } from "../mocks/users";

/**
 * Página de detalhes de um usuário.
 *
 * O identificador é recebido pela URL, permitindo
 * consultar diferentes usuários com o mesmo componente.
 *
 * Como ainda não existe backend, os dados são
 * consultados diretamente na lista simulada.
 */
export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const user = mockUsers.find((item) => item.id === Number(id));

  if (!user) {
    return (
      <section>
        <h2>Usuário não encontrado</h2>
        <p>Não encontramos um usuário com esse identificador.</p>
        <Link to=".." relative="path">
          Voltar para usuários
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Detalhes do usuário</h2>

      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Nome:</strong> {user.name}
      </p>
      <p>
        <strong>E-mail:</strong> {user.email}
      </p>

      <Link to=".." relative="path">
        Voltar para usuários
      </Link>
    </section>
  );
}
