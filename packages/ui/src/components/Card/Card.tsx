import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

/**
 * Propriedades do componente Card.
 *
 * Herda os atributos nativos de uma div HTML,
 * permitindo utilizar className, id, aria-label etc.
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: ReactNode;
}

/**
 * Componente visual reutilizável.
 *
 * Pode ser utilizado por qualquer microfrontend
 * sem depender de regras de negócio específicas.
 */
export function Card({
  title,
  description,
  children,
  className = "",
  ...props
}: CardProps) {
  const classes = ["devportal-card", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {title && <h3 className="devportal-card__title">{title}</h3>}

      {description && (
        <p className="devportal-card__description">{description}</p>
      )}

      <div className="devportal-card__content">{children}</div>
    </div>
  );
}
