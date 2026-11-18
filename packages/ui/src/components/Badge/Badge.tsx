import type { HTMLAttributes } from "react";
import "./Badge.css";

/**
 * Variantes visuais disponíveis para o Badge.
 */
export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

/**
 * Propriedades do Badge.
 * Herda os atributos nativos de um elemento span.
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/**
 * Indicador visual reutilizável.
 *
 * Não contém regras de negócio: cada microfrontend
 * determina o texto e a variante apropriados.
 */
export function Badge({
  variant = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const classes = ["devportal-badge", `devportal-badge--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
