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
       * Registro dos microfrontends remotos.
       *
       * O endereço aponta para o remoteEntry.js,
       * disponibilizado pelo Remote de Usuários.
       */
      remotes: {
        remote_users: {
          type: "module",
          name: "remote_users",
          entry: "http://localhost:3001/remoteEntry.js",
        },
      },

      // Compartilha a mesma instância de React.
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
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
