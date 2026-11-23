import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

/**
 * Configuração do Host do DevPortal.
 *
 * O Host é responsável por consumir os módulos
 * expostos pelos microfrontends independentes.
 */
export default defineConfig({
  plugins: [
    react(),

    federation({
      name: "devportal_host",

      /**
       * Registro dos microfrontends independentes.
       *
       * Cada Remote possui sua própria porta e
       * disponibiliza um arquivo remoteEntry.js.
       */
      remotes: {
        // Microfrontend de gerenciamento de usuários.
        remote_users: {
          type: "module",
          name: "remote_users",
          entry: "http://localhost:3001/remoteEntry.js",
        },

        // Microfrontend de indicadores e métricas.
        remote_dashboard: {
          type: "module",
          name: "remote_dashboard",
          entry: "http://localhost:3002/remoteEntry.js",
        },
      },

      /**
       * Compartilhamos as dependências essenciais para que
       * Host e Remote utilizem as mesmas instâncias.
       *
       * Isso evita contextos React e React Router duplicados
       * durante a composição dos microfrontends.
       */
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router": { singleton: true },
        "react-router-dom": { singleton: true },
      },

      // Tipos federados serão declarados manualmente.
      dts: false,
    }),
  ],

  server: {
    port: 3000,
    strictPort: true,
    host: "0.0.0.0",
  },

  preview: {
    port: 3000,
    strictPort: true,
    host: "0.0.0.0",
  },

  build: {
    target: "esnext",
  },
});
