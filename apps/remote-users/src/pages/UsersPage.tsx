import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Table, type TableColumn } from "@devportal/ui";
import { useUsers } from "../contexts/UsersContext";

/**
 * Página de gerenciamento de usuários.
 *
 * Utiliza componentes compartilhados da biblioteca
 * @devportal/ui, mantendo as regras de negócio
 * dentro do microfrontend Remote Users.
 */
export default function UsersPage() {
  const { users } = useUsers();

  // Estado local do campo de busca.
  const [search, setSearch] = useState("");

  // Filtra usuários somente quando os dados
  // ou o termo pesquisado forem alterados.
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

  // Define as colunas com base no tipo real
  // dos usuários retornados pelo contexto.
  type User = (typeof users)[number];

  const columns = useMemo<TableColumn<User>[]>(
    () => [
      {
        key: "name",
        header: "Nome",
        render: (user) => <Link to={String(user.id)}>{user.name}</Link>,
      },
      {
        key: "email",
        header: "E-mail",
        render: (user) => user.email,
      },
    ],
    [],
  );

  return (
    <section>
      <h2>Gerenciamento de Usuários</h2>

      <p>Consulte os usuários cadastrados no portal.</p>

      <p>
        <Link to="novo">Cadastrar usuário</Link>
      </p>

      <div style={{ marginBottom: "16px" }}>
        <Input
          id="search-users"
          label="Buscar usuários"
          type="search"
          placeholder="Digite um nome ou e-mail"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <Table
        columns={columns}
        data={filteredUsers}
        getRowKey={(user) => user.id}
        emptyMessage="Nenhum usuário encontrado."
      />
    </section>
  );
}
