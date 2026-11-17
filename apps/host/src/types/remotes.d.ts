/**
 * Declaração TypeScript para o módulo remoto.
 *
 * Permite importar o componente exposto pelo
 * Module Federation sem erros de tipagem.
 */
declare module "remote_users/UsersPage" {
  import type { ComponentType } from "react";

  const UsersPage: ComponentType;

  export default UsersPage;
}
