
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Configuração dos testes do Remote Dashboard.
 *
 * Os componentes são testados isoladamente,
 * sem necessidade de iniciar o Host ou
 * carregar o Module Federation.
 */
export default defineConfig({
  plugins: [react()],

  test: {
    // Simula o ambiente do navegador.
    environment: "jsdom",

    // Exige importação explícita de describe, it, expect etc.
    globals: false,

    // Executa a preparação antes dos testes.
    setupFiles: ["./src/test/setup.ts"],
  },
});
