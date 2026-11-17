import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

/**
 * Configuração do microfrontend de Usuários.
 *
 * O Remote disponibiliza componentes que podem ser
 * consumidos por outras aplicações de forma independente.
 */
export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "remote_users",

      filename: "remoteEntry.js",

      // Componentes disponibilizados para o Host.
      exposes: {
        "./UsersPage": "./src/pages/UsersPage.tsx",
      },

      /**
       * Desabilita temporariamente a geração automática
       * de declarações TypeScript federadas.
       *
       * A validação dos tipos da aplicação continua
       * sendo executada pelo comando tsc -b.
       */
      dts: false,

      // Compartilhamento das dependências React.
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
  ],

  server: {
    port: 3001,
    strictPort: true,
    host: "0.0.0.0",
    origin: "http://localhost:3001",
  },

  preview: {
    port: 3001,
    strictPort: true,
    host: "0.0.0.0",
  },

  build: {
    target: "esnext",
  },
});
