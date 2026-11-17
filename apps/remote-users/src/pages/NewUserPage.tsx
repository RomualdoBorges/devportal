import { useState, type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

/**
 * Formulário de cadastro simulado.
 *
 * Nesta etapa, os dados são mantidos apenas no estado
 * local do componente. Nenhuma requisição HTTP é feita.
 *
 * Posteriormente, implementaremos um estado compartilhado
 * para que usuários cadastrados apareçam na listagem.
 */
export default function NewUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Acessa a função de cadastro do estado compartilhado.
  const { users, addUser } = useUsers();

  // Permite navegar programaticamente após o cadastro.
  const navigate = useNavigate();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // Gera o próximo ID disponível.
    const nextId = Math.max(0, ...users.map((user) => user.id)) + 1;

    // Adiciona o usuário ao estado compartilhado.
    addUser({
      id: nextId,
      name: name.trim(),
      email: email.trim(),
    });

    // Retorna à listagem.
    navigate("..", { relative: "path" });
  }

  return (
    <section>
      <h2>Cadastrar usuário</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      <p>
        <Link to=".." relative="path">
          Voltar para usuários
        </Link>
      </p>
    </section>
  );
}
