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

      /**
       * O Remote expõe seu componente de roteamento.
       *
       * O Host conhece apenas o ponto de entrada,
       * mantendo as páginas internas desacopladas.
       */
      exposes: {
        "./UsersRoutes": "./src/UsersRoutes.tsx",
      },

      /**
       * Desabilita temporariamente a geração automática
       * de declarações TypeScript federadas.
       *
       * A validação dos tipos da aplicação continua
       * sendo executada pelo comando tsc -b.
       */
      dts: false,

      /**
       * O Remote compartilha as dependências de roteamento
       * com o Host quando executado de forma integrada.
       *
       * Quando executado isoladamente, utiliza as dependências
       * disponibilizadas pela própria aplicação.
       */
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router": { singleton: true },
        "react-router-dom": { singleton: true },
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
