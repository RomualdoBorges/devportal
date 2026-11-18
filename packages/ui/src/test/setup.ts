import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

/**
 * Limpa o DOM após cada teste, evitando
 * interferência entre renderizações.
 */
afterEach(() => {
  cleanup();
});
