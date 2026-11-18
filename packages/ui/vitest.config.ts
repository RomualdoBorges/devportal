import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Configuração dos testes da biblioteca compartilhada.
 *
 * A biblioteca não precisa de Module Federation:
 * seus componentes são importados diretamente
 * pelos aplicativos através do npm workspace.
 */
export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./src/test/setup.ts"],
  },
});
