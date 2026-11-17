/**
 * Declara o módulo remoto para o TypeScript.
 *
 * A implementação real é carregada dinamicamente
 * pelo Module Federation em tempo de execução.
 */
declare module "remote_users/UsersRoutes" {
  import type { ComponentType } from "react";

  const UsersRoutes: ComponentType;

  export default UsersRoutes;
}
