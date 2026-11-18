import type { Key, ReactNode } from "react";
import "./Table.css";

/**
 * Define uma coluna da tabela.
 *
 * O tipo genérico T representa o formato
 * dos dados recebidos pelo componente.
 */
export interface TableColumn<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
}

/**
 * Propriedades da tabela genérica.
 */
export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey: (item: T) => Key;
  emptyMessage?: string;
}

/**
 * Tabela reutilizável e independente
 * das regras de negócio dos microfrontends.
 */
export function Table<T>({
  columns,
  data,
  getRowKey,
  emptyMessage = "Nenhum registro encontrado.",
}: TableProps<T>) {
  return (
    <div className="devportal-table-container">
      <table className="devportal-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={getRowKey(item)}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render(item)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
