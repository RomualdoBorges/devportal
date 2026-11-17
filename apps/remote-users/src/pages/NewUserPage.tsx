import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

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
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Simula o envio sem persistir os dados.
    setSubmitted(true);
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

      {submitted && (
        <p role="status">
          Cadastro simulado realizado! Os dados ainda não são persistidos.
        </p>
      )}

      <p>
        <Link to=".." relative="path">
          Voltar para usuários
        </Link>
      </p>
    </section>
  );
}
