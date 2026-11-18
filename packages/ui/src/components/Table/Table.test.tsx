import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table, type TableColumn } from "./Table";

interface TestUser {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumn<TestUser>[] = [
  {
    key: "name",
    header: "Nome",
    render: (user) => user.name,
  },
  {
    key: "email",
    header: "E-mail",
    render: (user) => user.email,
  },
];

const users: TestUser[] = [
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
];

describe("Table compartilhado", () => {
  it("renderiza os cabeçalhos das colunas", () => {
    render(
      <Table columns={columns} data={users} getRowKey={(user) => user.id} />,
    );

    expect(
      screen.getByRole("columnheader", { name: "Nome" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("columnheader", { name: "E-mail" }),
    ).toBeInTheDocument();
  });

  it("renderiza os dados recebidos", () => {
    render(
      <Table columns={columns} data={users} getRowKey={(user) => user.id} />,
    );

    expect(screen.getByText("Ana Silva")).toBeInTheDocument();
    expect(screen.getByText("Carlos Souza")).toBeInTheDocument();
  });

  it("exibe uma mensagem quando não existem registros", () => {
    render(
      <Table
        columns={columns}
        data={[]}
        getRowKey={(user) => user.id}
        emptyMessage="Nenhum usuário encontrado."
      />,
    );

    expect(screen.getByText("Nenhum usuário encontrado.")).toBeInTheDocument();
  });
});
