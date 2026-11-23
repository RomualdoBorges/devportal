import { Card } from "@devportal/ui";

/**
 * Propriedades recebidas do Dashboard.
 *
 * O componente não conhece a origem dos dados,
 * apenas apresenta os valores informados.
 */
interface UsersDistributionProps {
  active: number;
  inactive: number;
}

/**
 * Exibe a distribuição de usuários
 * utilizando barras proporcionais.
 */
export function UsersDistribution({
  active,
  inactive,
}: UsersDistributionProps) {
  const total = active + inactive;

  const activePercentage = total > 0 ? (active / total) * 100 : 0;

  const inactivePercentage = total > 0 ? (inactive / total) * 100 : 0;

  return (
    <Card
      title="Distribuição de usuários"
      description="Proporção de usuários ativos e inativos.">
      <div style={{ display: "grid", gap: "20px" }}>
        <div>
          <p>
            Ativos: {active} ({activePercentage.toFixed(2)}%)
          </p>

          <div
            role="progressbar"
            aria-label="Usuários ativos"
            aria-valuenow={activePercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              height: "16px",
              backgroundColor: "#e2e8f0",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
            <div
              style={{
                width: `${activePercentage}%`,
                height: "100%",
                backgroundColor: "#16a34a",
              }}
            />
          </div>
        </div>

        <div>
          <p>
            Inativos: {inactive} ({inactivePercentage.toFixed(2)}%)
          </p>

          <div
            role="progressbar"
            aria-label="Usuários inativos"
            aria-valuenow={inactivePercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              height: "16px",
              backgroundColor: "#e2e8f0",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
            <div
              style={{
                width: `${inactivePercentage}%`,
                height: "100%",
                backgroundColor: "#f59e0b",
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
