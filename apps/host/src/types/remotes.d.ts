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

/**
 * Declara o módulo remoto de Dashboard.
 *
 * O componente será carregado dinamicamente
 * pelo Host através do Module Federation.
 */
declare module "remote_dashboard/DashboardRoutes" {
  import type { ComponentType } from "react";

  const DashboardRoutes: ComponentType;

  export default DashboardRoutes;
}
