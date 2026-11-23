import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

/**
 * Configuração do microfrontend de Dashboard.
 *
 * Pode ser executado independentemente na porta 3002
 * ou consumido pelo Host via Module Federation.
 */
export default defineConfig({
  plugins: [
    react(),

    federation({
      // Identificador utilizado pelo Module Federation.
      name: "remote_dashboard",

      // Arquivo de entrada que o Host utilizará.
      filename: "remoteEntry.js",

      /**
       * Expõe o componente responsável pelas rotas
       * internas do Dashboard.
       *
       * O arquivo DashboardRoutes.tsx será criado
       * no próximo passo.
       */
      exposes: {
        "./DashboardRoutes": "./src/DashboardRoutes.tsx",
      },

      // Mantém a validação TypeScript pelo tsc -b.
      dts: false,

      /**
       * Compartilha as instâncias do React e do Router
       * para evitar conflitos entre Host e Remote.
       */
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router": { singleton: true },
        "react-router-dom": { singleton: true },
      },
    }),
  ],

  // Servidor de desenvolvimento independente.
  server: {
    port: 3002,
    strictPort: true,
    host: "0.0.0.0",
    origin: "http://localhost:3002",
  },

  // Servidor para visualizar o build de produção.
  preview: {
    port: 3002,
    strictPort: true,
    host: "0.0.0.0",
  },

  build: {
    target: "esnext",
  },
});
