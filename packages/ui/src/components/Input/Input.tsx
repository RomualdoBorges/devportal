import { useId, type InputHTMLAttributes } from "react";
import "./Input.css";

/**
 * Propriedades do campo de entrada.
 *
 * Herda os atributos nativos do input HTML.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/**
 * Campo reutilizável com label e suporte a erros.
 */
export function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  // Gera um ID estável quando nenhum ID é informado.
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const classes = [
    "devportal-input",
    error ? "devportal-input--error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="devportal-input-field">
      <label className="devportal-input-label" htmlFor={inputId}>
        {label}
      </label>

      <input
        {...props}
        id={inputId}
        className={classes}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error
            ? [props["aria-describedby"], errorId].filter(Boolean).join(" ")
            : props["aria-describedby"]
        }
      />

      {error && (
        <span className="devportal-input-error" id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
