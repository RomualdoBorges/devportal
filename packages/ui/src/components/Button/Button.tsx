import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

// Propriedades específicas do nosso componente.
type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

// Herdamos as propriedades nativas de um botão HTML.
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const classes = [
    "devportal-button",
    `devportal-button--${variant}`,
    `devportal-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
