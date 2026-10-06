import type { StatusChamado } from "../../types/chamado";

interface StatusBadgeProps {
  status: StatusChamado;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const labels = {
    NOVO: "Novo",
    EM_ATENDIMENTO: "Em atendimento",
    RESOLVIDO: "Resolvido",
  };

  return (
    <span className={`status-badge status-${status.toLowerCase()}`}>
      {labels[status]}
    </span>
  );
}

export default StatusBadge;
