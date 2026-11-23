
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

/**
 * Limpa o DOM após cada teste.
 *
 * Evita que componentes renderizados em um teste
 * interfiram nos testes seguintes.
 */
afterEach(() => {
  cleanup();
});
